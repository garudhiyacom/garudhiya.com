// Get blog posts from Firebase
async function getBlogPosts() {
    try {
        const posts = await getBlogPostsFromFirebase();
        return posts;
    } catch (error) {
        console.error('Error loading blog posts:', error);
        return [];
    }
}

// View Counter Functions (using Firebase)
async function getPostViews(postId) {
    try {
        const stats = await getPostStatsFromFirebase(postId);
        return stats?.views || 0;
    } catch (error) {
        console.error('Error getting views:', error);
        return 0;
    }
}

async function incrementPostViews(postId) {
    try {
        await incrementPostViewsInFirebase(postId);
        return await getPostViews(postId);
    } catch (error) {
        console.error('Error incrementing views:', error);
        return 0;
    }
}

// Like Functions (using Firebase + localStorage for user tracking)
async function getPostLikes(postId) {
    try {
        const stats = await getPostStatsFromFirebase(postId);
        return stats?.likes || 0;
    } catch (error) {
        console.error('Error getting likes:', error);
        return 0;
    }
}

function isPostLiked(postId) {
    // Keep user's liked posts in localStorage (user-specific)
    const stored = localStorage.getItem('userLikes');
    const userLikes = stored ? JSON.parse(stored) : [];
    return userLikes.includes(postId);
}

async function toggleLike(postId) {
    const storedUserLikes = localStorage.getItem('userLikes');
    const userLikes = storedUserLikes ? JSON.parse(storedUserLikes) : [];
    const liked = userLikes.includes(postId);
    
    try {
        if (liked) {
            // Unlike
            await incrementPostLikesInFirebase(postId, -1);
            const index = userLikes.indexOf(postId);
            userLikes.splice(index, 1);
        } else {
            // Like
            await incrementPostLikesInFirebase(postId, 1);
            userLikes.push(postId);
        }
        
        localStorage.setItem('userLikes', JSON.stringify(userLikes));
        return !liked;
    } catch (error) {
        console.error('Error toggling like:', error);
        return liked;
    }
}

// Simple comment functions
async function loadComments(postId) {
    try {
        const comments = await getCommentsFromFirebase(postId);
        await displayComments(comments, postId);
    } catch (error) {
        console.error('Error loading comments:', error);
        document.getElementById('comments-list').innerHTML = '<p style="color: #999; text-align: center;">Error loading comments</p>';
    }
}

async function displayComments(comments, postId) {
    const container = document.getElementById('comments-list');
    
    if (!comments || comments.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center; padding: 2rem;">No comments yet. Be the first to comment!</p>';
        return;
    }
    
    // Separate parents and replies
    const parents = comments.filter(c => !c.parentId);
    const replies = comments.filter(c => c.parentId);
    
    // Sort parents by likes (most liked first)
    const sortedParents = parents.sort((a, b) => {
        const aLikes = (a.likes || 0) - (a.dislikes || 0);
        const bLikes = (b.likes || 0) - (b.dislikes || 0);
        return bLikes - aLikes;
    });
    
    // Show first 10 comments
    const visibleComments = sortedParents.slice(0, 10);
    const remainingCount = sortedParents.length - 10;
    
    // Render comments with await
    const commentHtmlPromises = visibleComments.map(async comment => {
        const commentReplies = replies.filter(r => r.parentId === (comment.id || comment.timestamp));
        return await renderComment(comment, postId, commentReplies);
    });
    const commentHtmlArray = await Promise.all(commentHtmlPromises);
    container.innerHTML = commentHtmlArray.join('');
    
    // Add "Load More Comments" button if there are more
    if (remainingCount > 0) {
        container.innerHTML += `
            <div style="text-align: center; padding: 2rem;">
                <button onclick="loadMoreComments('${postId}')" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 0.75rem 2rem; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 1rem;">
                    Load More Comments (${remainingCount})
                </button>
            </div>
        `;
    }
    
    // Store all comments for "load more" functionality
    window.allComments = sortedParents;
    window.allReplies = replies;
    window.currentCommentIndex = 10;
}

async function renderComment(comment, postId, replies = []) {
    const initial = comment.name.charAt(0).toUpperCase();
    const commentId = comment.id || comment.timestamp;
    const commentTime = getTimeAgo(comment.timestamp);
    
    // Sort replies by likes (most liked first)
    const sortedReplies = replies.sort((a, b) => {
        const aLikes = (a.likes || 0) - (a.dislikes || 0);
        const bLikes = (b.likes || 0) - (b.dislikes || 0);
        return bLikes - aLikes;
    });
    
    // Show first 5 replies
    const visibleReplies = sortedReplies.slice(0, 5);
    const remainingReplies = sortedReplies.length - 5;
    
    // Get user interactions from Firebase
    const userInteractions = await getUserCommentInteractions();
    const userLikes = userInteractions.likes || {};
    const userDislikes = userInteractions.dislikes || {};
    
    const repliesHtml = visibleReplies.map(reply => {
        const replyInitial = reply.name.charAt(0).toUpperCase();
        const replyTime = getTimeAgo(reply.timestamp);
        const replyId = reply.id || reply.timestamp;
        const replyLikes = reply.likes || 0;
        const replyDislikes = reply.dislikes || 0;
        const isLiked = userLikes[replyId];
        const isDisliked = userDislikes[replyId];
        
        return `
            <div class="comment comment-reply" data-comment-id="${replyId}">
                <div class="comment-avatar">${replyInitial}</div>
                <div class="comment-content">
                    <div class="comment-bubble">
                        <span class="comment-author">${reply.name}</span>
                        <div class="comment-body">${reply.text}</div>
                    </div>
                    <div class="comment-meta">
                        <span class="comment-date" title="${replyTime.full}">${replyTime.relative}</span>
                        <div class="comment-actions">
                            <button class="comment-action-btn ${isLiked ? 'liked' : ''}" data-like="${replyId}">
                                <span>👍</span> <span>${replyLikes || ''}</span>
                            </button>
                            <button class="comment-action-btn ${isDisliked ? 'disliked' : ''}" data-dislike="${replyId}">
                                <span>👎</span> <span>${replyDislikes || ''}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    const likes = comment.likes || 0;
    const dislikes = comment.dislikes || 0;
    const isLiked = userLikes[commentId];
    const isDisliked = userDislikes[commentId];
    
    const loadMoreBtn = remainingReplies > 0 ? `
        <div style="padding: 1rem 0 1rem 3rem;">
            <button onclick="loadMoreReplies('${commentId}', '${postId}')" style="background: transparent; color: #667eea; border: 1px solid #667eea; padding: 0.5rem 1.5rem; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 0.875rem;">
                Load More Replies (${remainingReplies})
            </button>
        </div>
    ` : '';
    
    return `
        <div class="comment-thread" data-thread-id="${commentId}">
            <div class="comment" data-comment-id="${commentId}">
                <div class="comment-avatar">${initial}</div>
                <div class="comment-content">
                    <div class="comment-bubble">
                        <span class="comment-author">${comment.name}</span>
                        <div class="comment-body">${comment.text}</div>
                    </div>
                    <div class="comment-meta">
                        <span class="comment-date" title="${commentTime.full}">${commentTime.relative}</span>
                        <div class="comment-actions">
                            <button class="comment-action-btn ${isLiked ? 'liked' : ''}" data-like="${commentId}">
                                <span>👍</span> <span>${likes || ''}</span>
                            </button>
                            <button class="comment-action-btn ${isDisliked ? 'disliked' : ''}" data-dislike="${commentId}">
                                <span>👎</span> <span>${dislikes || ''}</span>
                            </button>
                            <button class="comment-action-btn" data-reply="${commentId}" data-author="${comment.name}">
                                <span>💬</span> Reply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="reply-form-container" id="reply-${commentId}"></div>
            ${repliesHtml ? `<div class="comment-replies" id="replies-${commentId}">${repliesHtml}</div>` : ''}
            ${loadMoreBtn}
        </div>
    `;
}

function getTimeAgo(timestamp) {
    if (!timestamp) return { relative: 'Just now', full: 'Just now' };
    
    const date = new Date(timestamp);
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    // Full date and time
    const fullDateTime = date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    
    // Relative time
    let relative;
    if (minutes < 1) relative = 'Just now';
    else if (minutes < 60) relative = `${minutes}m ago`;
    else if (hours < 24) relative = `${hours}h ago`;
    else if (days < 7) relative = `${days}d ago`;
    else relative = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    return { relative, full: fullDateTime };
}

async function postComment(postId, name, text, parentId = null) {
    const comment = {
        name,
        text,
        postId,
        timestamp: Date.now(),
        parentId,
        likes: 0,
        dislikes: 0
    };
    
    try {
        await saveCommentToFirebase(comment);
        await loadComments(postId);
        return true;
    } catch (error) {
        console.error('Error posting comment:', error);
        return false;
    }
}

async function loadMoreComments(postId) {
    const container = document.getElementById('comments-list');
    const nextBatch = window.allComments.slice(window.currentCommentIndex, window.currentCommentIndex + 10);
    const remainingCount = window.allComments.length - window.currentCommentIndex - 10;
    
    // Remove load more button temporarily
    const loadMoreBtn = container.querySelector('div[style*="text-align: center"]');
    if (loadMoreBtn) loadMoreBtn.remove();
    
    // Render next batch
    for (const comment of nextBatch) {
        const commentReplies = window.allReplies.filter(r => r.parentId === (comment.id || comment.timestamp));
        const commentHtml = await renderComment(comment, postId, commentReplies);
        container.innerHTML += commentHtml;
    }
    
    window.currentCommentIndex += 10;
    
    // Add new load more button if needed
    if (remainingCount > 0) {
        container.innerHTML += `
            <div style="text-align: center; padding: 2rem;">
                <button onclick="loadMoreComments('${postId}')" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 0.75rem 2rem; border-radius: 12px; font-weight: 600; cursor: pointer; font-size: 1rem;">
                    Load More Comments (${remainingCount})
                </button>
            </div>
        `;
    }
}

async function loadMoreReplies(commentId, postId) {
    const thread = document.querySelector(`[data-thread-id="${commentId}"]`);
    const repliesContainer = thread.querySelector(`#replies-${commentId}`);
    const loadMoreBtn = thread.querySelector('div[style*="padding: 1rem 0 1rem 3rem"]');
    
    // Get all replies for this comment
    const allReplies = window.allReplies.filter(r => r.parentId === commentId);
    const sortedReplies = allReplies.sort((a, b) => {
        const aLikes = (a.likes || 0) - (a.dislikes || 0);
        const bLikes = (b.likes || 0) - (b.dislikes || 0);
        return bLikes - aLikes;
    });
    
    // Get user interactions from Firebase
    const userInteractions = await getUserCommentInteractions();
    const userLikes = userInteractions.likes || {};
    const userDislikes = userInteractions.dislikes || {};
    
    // Show all remaining replies
    const remainingReplies = sortedReplies.slice(5);
    remainingReplies.forEach(reply => {
        const replyInitial = reply.name.charAt(0).toUpperCase();
        const replyTime = getTimeAgo(reply.timestamp);
        const replyId = reply.id || reply.timestamp;
        const replyLikes = reply.likes || 0;
        const replyDislikes = reply.dislikes || 0;
        const isLiked = userLikes[replyId];
        const isDisliked = userDislikes[replyId];
        
        const replyHtml = `
            <div class="comment comment-reply" data-comment-id="${replyId}">
                <div class="comment-avatar">${replyInitial}</div>
                <div class="comment-content">
                    <div class="comment-bubble">
                        <span class="comment-author">${reply.name}</span>
                        <div class="comment-body">${reply.text}</div>
                    </div>
                    <div class="comment-meta">
                        <span class="comment-date" title="${replyTime.full}">${replyTime.relative}</span>
                        <div class="comment-actions">
                            <button class="comment-action-btn ${isLiked ? 'liked' : ''}" data-like="${replyId}">
                                <span>👍</span> <span>${replyLikes || ''}</span>
                            </button>
                            <button class="comment-action-btn ${isDisliked ? 'disliked' : ''}" data-dislike="${replyId}">
                                <span>👎</span> <span>${replyDislikes || ''}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        repliesContainer.innerHTML += replyHtml;
    });
    
    // Remove load more button
    if (loadMoreBtn) loadMoreBtn.remove();
}

// Get or create user session ID
function getUserSessionId() {
    let sessionId = sessionStorage.getItem('userSessionId');
    if (!sessionId) {
        sessionId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('userSessionId', sessionId);
    }
    return sessionId;
}

// Get user's comment interactions from Firebase
async function getUserCommentInteractions() {
    try {
        const userId = getUserSessionId();
        const doc = await db.collection('userInteractions').doc(userId).get();
        if (doc.exists) {
            return doc.data();
        }
        return { likes: {}, dislikes: {} };
    } catch (error) {
        console.error('Error getting user interactions:', error);
        return { likes: {}, dislikes: {} };
    }
}

// Save user's comment interactions to Firebase
async function saveUserCommentInteractions(interactions) {
    try {
        const userId = getUserSessionId();
        await db.collection('userInteractions').doc(userId).set(interactions);
    } catch (error) {
        console.error('Error saving user interactions:', error);
    }
}

async function toggleCommentLike(postId, commentId, type) {
    try {
        // Get user's interactions from Firebase
        const userInteractions = await getUserCommentInteractions();
        const userLikes = userInteractions.likes || {};
        const userDislikes = userInteractions.dislikes || {};
        
        const comments = await getCommentsFromFirebase(postId);
        const comment = comments.find(c => String(c.id || c.timestamp) === String(commentId));
        
        if (comment) {
            if (type === 'like') {
                if (userLikes[commentId]) {
                    // Already liked, remove like
                    comment.likes = Math.max(0, (comment.likes || 0) - 1);
                    delete userLikes[commentId];
                } else {
                    // Add like
                    comment.likes = (comment.likes || 0) + 1;
                    userLikes[commentId] = true;
                    // Remove dislike if exists
                    if (userDislikes[commentId]) {
                        comment.dislikes = Math.max(0, (comment.dislikes || 0) - 1);
                        delete userDislikes[commentId];
                    }
                }
            } else {
                if (userDislikes[commentId]) {
                    // Already disliked, remove dislike
                    comment.dislikes = Math.max(0, (comment.dislikes || 0) - 1);
                    delete userDislikes[commentId];
                } else {
                    // Add dislike
                    comment.dislikes = (comment.dislikes || 0) + 1;
                    userDislikes[commentId] = true;
                    // Remove like if exists
                    if (userLikes[commentId]) {
                        comment.likes = Math.max(0, (comment.likes || 0) - 1);
                        delete userLikes[commentId];
                    }
                }
            }
            
            // Save to Firebase
            await saveUserCommentInteractions({ likes: userLikes, dislikes: userDislikes });
            await saveCommentToFirebase(comment);
            await loadComments(postId);
        }
    } catch (error) {
        console.error('Error toggling like:', error);
    }
}

// Make functions globally accessible
window.loadMoreComments = loadMoreComments;
window.loadMoreReplies = loadMoreReplies;

// Setup comment event listeners
function setupCommentListeners(postId) {
    // Handle reply, like, and dislike buttons
    document.addEventListener('click', async (e) => {
        const replyBtn = e.target.closest('[data-reply]');
        const likeBtn = e.target.closest('[data-like]');
        const dislikeBtn = e.target.closest('[data-dislike]');
        
        if (replyBtn) {
            const commentId = replyBtn.dataset.reply;
            const authorName = replyBtn.dataset.author;
            showReplyForm(commentId, authorName, postId);
        }
        
        if (likeBtn) {
            const commentId = likeBtn.dataset.like;
            await toggleCommentLike(postId, commentId, 'like');
        }
        
        if (dislikeBtn) {
            const commentId = dislikeBtn.dataset.dislike;
            await toggleCommentLike(postId, commentId, 'dislike');
        }
    });
    
    // Handle main comment form
    const mainForm = document.getElementById('comment-form');
    if (mainForm) {
        mainForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('comment-name').value.trim();
            const text = document.getElementById('comment-text').value.trim();
            
            if (name && text) {
                const success = await postComment(postId, name, text);
                if (success) {
                    document.getElementById('comment-text').value = '';
                }
            }
        });
    }
}

function showReplyForm(commentId, authorName, postId) {
    // Remove any existing reply forms
    document.querySelectorAll('.inline-reply-form').forEach(f => f.remove());
    
    const container = document.getElementById(`reply-${commentId}`);
    if (!container) return;
    
    // Get saved name from main form
    const savedName = document.getElementById('comment-name')?.value || '';
    
    container.innerHTML = `
        <form class="inline-reply-form" style="padding: 1rem 0 1rem 3rem;">
            <input type="text" class="reply-name" placeholder="Your name" value="${savedName}" style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 0.5rem;">
            <textarea class="reply-text" placeholder="Write a reply..." style="width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 12px; min-height: 80px; margin-bottom: 0.5rem;"></textarea>
            <div style="display: flex; gap: 0.5rem;">
                <button type="submit" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 0.5rem 1.25rem; border-radius: 8px; font-weight: 600; cursor: pointer;">Reply</button>
                <button type="button" class="cancel-reply" style="background: transparent; color: #6b7280; border: 1px solid #e5e7eb; padding: 0.5rem 1.25rem; border-radius: 8px; font-weight: 600; cursor: pointer;">Cancel</button>
            </div>
        </form>
    `;
    
    const form = container.querySelector('.inline-reply-form');
    const nameInput = form.querySelector('.reply-name');
    nameInput.focus();
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = form.querySelector('.reply-name').value.trim();
        const text = form.querySelector('.reply-text').value.trim();
        
        if (name && text) {
            const success = await postComment(postId, name, text, commentId);
            if (success) {
                container.innerHTML = '';
            }
        }
    });
    
    form.querySelector('.cancel-reply').addEventListener('click', () => {
        container.innerHTML = '';
    });
}

// Load related posts
async function loadRelatedPosts(currentPostId) {
    const allPosts = await getBlogPosts();
    const relatedPostsGrid = document.getElementById('related-posts-grid');
    
    // Get 3 random posts excluding current post and hidden posts
    const otherPosts = allPosts.filter(post => post.id !== currentPostId && !post.hidden);
    const shuffled = otherPosts.sort(() => 0.5 - Math.random());
    const relatedPosts = shuffled.slice(0, 3);
    
    if (relatedPosts.length === 0) {
        relatedPostsGrid.innerHTML = '<p style="text-align: center; color: var(--text-light);">No related posts available.</p>';
        return;
    }
    
    relatedPostsGrid.innerHTML = relatedPosts.map(post => {
        const readingTime = calculateReadingTime(post.content);
        return `
            <a href="/blog/${post.id}" class="related-post-card">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
                <div class="related-post-content">
                    <div class="related-post-meta">${post.date} • ${readingTime} min read</div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                </div>
            </a>
        `;
    }).join('');
}

// Get post ID from URL (supports both /blog/ID and ?id=ID formats)
function getPostIdFromUrl() {
    // First, try to get ID from clean URL path (/blog/123 or /blog/abc123)
    const pathMatch = window.location.pathname.match(/\/blog\/([a-zA-Z0-9_-]+)/);
    if (pathMatch) {
        const id = pathMatch[1];
        // Return as number if it's numeric, otherwise as string
        return isNaN(id) ? id : parseInt(id);
    }
    
    // Fallback to query parameter (?id=123)
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    // Return as-is (could be string or number)
    return id ? (isNaN(id) ? id : parseInt(id)) : null;
}


// Load blog post on page load
document.addEventListener('DOMContentLoaded', async function() {
    const postId = getPostIdFromUrl();
    
    if (!postId) {
        // No ID provided, redirect to blog page
        window.location.href = '/blog';
        return;
    }
    
    const posts = await getBlogPosts();
    
    // Try to find post by ID (handle both string and number IDs)
    const post = posts.find(p => {
        return p.id == postId || 
               p.id === postId.toString() || 
               p.id === parseInt(postId) ||
               parseInt(p.id) === postId;
    });
    
    
    if (!post) {
        // Post not found
        document.getElementById('post-title').textContent = 'Post Not Found';
        document.getElementById('post-content').innerHTML = '<p>Sorry, this blog post could not be found.</p><p><a href="blog.html">Return to blog</a></p>';
        return;
    }
    
    // Check if post is hidden
    if (post.hidden) {
        document.getElementById('post-title').textContent = 'Post Not Available';
        document.getElementById('post-content').innerHTML = '<p>This blog post is currently not available.</p><p><a href="blog.html">Return to blog</a></p>';
        return;
    }
    
    // Update page title
    document.title = `${post.title} | Garudhiya`;
    
    // Update breadcrumb
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    if (breadcrumbCurrent) {
        breadcrumbCurrent.textContent = post.title;
    }
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = post.excerpt;
    }
    
    // Update Open Graph meta tags
    const pageUrl = window.location.href;
    
    // OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
    }
    ogTitle.content = post.title;
    
    // OG Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
    }
    ogDesc.content = post.excerpt;
    
    // OG URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
    }
    ogUrl.content = pageUrl;
    
    // OG Image
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
        ogImage = document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        document.head.appendChild(ogImage);
    }
    ogImage.content = post.image;
    
    // OG Type
    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
        ogType = document.createElement('meta');
        ogType.setAttribute('property', 'og:type');
        document.head.appendChild(ogType);
    }
    ogType.content = 'article';
    
    // Twitter Card
    let twitterCard = document.querySelector('meta[property="twitter:card"]');
    if (!twitterCard) {
        twitterCard = document.createElement('meta');
        twitterCard.setAttribute('property', 'twitter:card');
        document.head.appendChild(twitterCard);
    }
    twitterCard.content = 'summary_large_image';
    
    // Twitter Title
    let twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (!twitterTitle) {
        twitterTitle = document.createElement('meta');
        twitterTitle.setAttribute('property', 'twitter:title');
        document.head.appendChild(twitterTitle);
    }
    twitterTitle.content = post.title;
    
    // Twitter Description
    let twitterDesc = document.querySelector('meta[property="twitter:description"]');
    if (!twitterDesc) {
        twitterDesc = document.createElement('meta');
        twitterDesc.setAttribute('property', 'twitter:description');
        document.head.appendChild(twitterDesc);
    }
    twitterDesc.content = post.excerpt;
    
    // Twitter Image
    let twitterImage = document.querySelector('meta[property="twitter:image"]');
    if (!twitterImage) {
        twitterImage = document.createElement('meta');
        twitterImage.setAttribute('property', 'twitter:image');
        document.head.appendChild(twitterImage);
    }
    twitterImage.content = post.image;
    
    // Calculate reading time
    const wordsPerMinute = 200;
    const wordCount = post.content ? post.content.trim().split(/\s+/).length : 0;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    // Display post
    const emojiDiv = document.getElementById('post-emoji');
    emojiDiv.innerHTML = `<img src="${post.image}" alt="${post.title}" loading="lazy" style="max-width: 400px; width: 100%; height: auto; border-radius: 12px;">`;
    
    // Increment and get view count (only once per session)
    const viewedKey = `viewed_${postId}`;
    const hasViewed = sessionStorage.getItem(viewedKey);
    
    if (!hasViewed) {
        await incrementPostViews(postId);
        sessionStorage.setItem(viewedKey, 'true');
    }
    
    const views = await getPostViews(postId);
    
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-date').textContent = `${post.date} • ${readingTime} min read • ${views} views`;
    
    // Display content
    const contentDiv = document.getElementById('post-content');
    if (post.content) {
        // Check if content contains HTML tags
        const hasHTMLTags = /<[a-z][\s\S]*>/i.test(post.content);
        
        if (hasHTMLTags) {
            // Render HTML content directly
            contentDiv.innerHTML = post.content;
        } else {
            // Legacy support: Convert line breaks to paragraphs for old posts
            const paragraphs = post.content.split('\n\n').filter(p => p.trim());
            contentDiv.innerHTML = paragraphs.map(p => `<p>${p.trim()}</p>`).join('');
        }
    } else {
        // Fallback to excerpt if no full content
        contentDiv.innerHTML = `
            <p>${post.excerpt}</p>
            <p><em>This is a preview. Full content coming soon!</em></p>
        `;
    }
    
    // Setup like button
    const likeButton = document.getElementById('like-button');
    const likeCount = document.getElementById('like-count');
    const heartIcon = likeButton.querySelector('.heart-icon');
    const likeText = likeButton.querySelector('.like-text');
    
    const likes = await getPostLikes(postId);
    const liked = isPostLiked(postId);
    
    likeCount.textContent = likes;
    
    if (liked) {
        likeButton.classList.add('liked');
        heartIcon.textContent = '♥';
        likeText.textContent = 'Liked';
    }
    
    likeButton.addEventListener('click', async function() {
        const nowLiked = await toggleLike(postId);
        const newLikes = await getPostLikes(postId);
        
        likeCount.textContent = newLikes;
        
        if (nowLiked) {
            likeButton.classList.add('liked');
            heartIcon.textContent = '♥';
            likeText.textContent = 'Liked';
            if (typeof showToast === 'function') {
                showToast('Thanks for liking this post!', 'success');
            }
        } else {
            likeButton.classList.remove('liked');
            heartIcon.textContent = '♡';
            likeText.textContent = 'Like this post';
        }
    });
    
    // Setup share buttons
    const currentUrl = window.location.href;
    const postTitle = encodeURIComponent(post.title);
    const postUrl = encodeURIComponent(currentUrl);
    
    // Twitter share
    document.getElementById('share-twitter').addEventListener('click', function() {
        window.open(`https://twitter.com/intent/tweet?text=${postTitle}&url=${postUrl}`, '_blank', 'width=600,height=400');
    });
    
    // Facebook share
    document.getElementById('share-facebook').addEventListener('click', function() {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`, '_blank', 'width=600,height=400');
    });
    
    // LinkedIn share
    document.getElementById('share-linkedin').addEventListener('click', function() {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`, '_blank', 'width=600,height=400');
    });
    
    // Copy link
    document.getElementById('share-copy').addEventListener('click', function() {
        navigator.clipboard.writeText(currentUrl).then(function() {
            const btn = document.getElementById('share-copy');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!';
            setTimeout(function() {
                btn.innerHTML = originalText;
            }, 2000);
        });
    });
    
    // Load related posts
    await loadRelatedPosts(postId);
    
    // Load comments and setup listeners
    await loadComments(postId);
    setupCommentListeners(postId);
});
