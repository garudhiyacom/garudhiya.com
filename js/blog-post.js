// Get blog posts from localStorage
function getBlogPosts() {
    const stored = localStorage.getItem('blogPosts');
    return stored ? JSON.parse(stored) : [];
}

// View Counter Functions
function getPostViews(postId) {
    const stored = localStorage.getItem('postViews');
    const allViews = stored ? JSON.parse(stored) : {};
    return allViews[postId] || 0;
}

function incrementPostViews(postId) {
    const stored = localStorage.getItem('postViews');
    const allViews = stored ? JSON.parse(stored) : {};
    allViews[postId] = (allViews[postId] || 0) + 1;
    localStorage.setItem('postViews', JSON.stringify(allViews));
    return allViews[postId];
}

// Like Functions
function getPostLikes(postId) {
    const stored = localStorage.getItem('postLikes');
    const allLikes = stored ? JSON.parse(stored) : {};
    return allLikes[postId] || 0;
}

function isPostLiked(postId) {
    const stored = localStorage.getItem('userLikes');
    const userLikes = stored ? JSON.parse(stored) : [];
    return userLikes.includes(postId);
}

function toggleLike(postId) {
    const storedLikes = localStorage.getItem('postLikes');
    const allLikes = storedLikes ? JSON.parse(storedLikes) : {};
    
    const storedUserLikes = localStorage.getItem('userLikes');
    const userLikes = storedUserLikes ? JSON.parse(storedUserLikes) : [];
    
    const liked = userLikes.includes(postId);
    
    if (liked) {
        // Unlike
        allLikes[postId] = Math.max(0, (allLikes[postId] || 0) - 1);
        const index = userLikes.indexOf(postId);
        userLikes.splice(index, 1);
    } else {
        // Like
        allLikes[postId] = (allLikes[postId] || 0) + 1;
        userLikes.push(postId);
    }
    
    localStorage.setItem('postLikes', JSON.stringify(allLikes));
    localStorage.setItem('userLikes', JSON.stringify(userLikes));
    
    return !liked;
}

// Get comments from localStorage
function getComments(postId) {
    const stored = localStorage.getItem('comments');
    const allComments = stored ? JSON.parse(stored) : {};
    return allComments[postId] || [];
}

// Save comments to localStorage
function saveComments(postId, comments) {
    const stored = localStorage.getItem('comments');
    const allComments = stored ? JSON.parse(stored) : {};
    allComments[postId] = comments;
    localStorage.setItem('comments', JSON.stringify(allComments));
}

// Delete comment
function deleteComment(postId, commentIndex) {
    const comments = getComments(postId);
    comments.splice(commentIndex, 1);
    saveComments(postId, comments);
    displayComments(postId);
}

// Display comments
function displayComments(postId) {
    const comments = getComments(postId);
    const commentsDiv = document.getElementById('comments-list');
    
    if (comments.length === 0) {
        commentsDiv.innerHTML = '<p style="color: var(--text-light);">No comments yet. Be the first to comment!</p>';
        return;
    }
    
    commentsDiv.innerHTML = comments.map((comment, index) => `
        <div class="comment">
            <div class="comment-author">${comment.name}</div>
            <div class="comment-date">${comment.date}</div>
            <div class="comment-text">${comment.text}</div>
        </div>
    `).join('');
}

// Handle delete comment with confirmation
async function handleDeleteComment(postId, commentIndex) {
    if (typeof showConfirm !== 'function') {
        if (confirm('Are you sure you want to delete this comment?')) {
            deleteComment(postId, commentIndex);
            if (typeof showToast === 'function') {
                showToast('Comment deleted', 'success');
            }
        }
        return;
    }
    
    const confirmed = await showConfirm(
        'Delete Comment?',
        'Are you sure you want to delete this comment? This action cannot be undone.',
        'Delete',
        'Cancel'
    );
    
    if (confirmed) {
        deleteComment(postId, commentIndex);
        if (typeof showToast === 'function') {
            showToast('Comment deleted successfully', 'success');
        }
    }
}

// Make handleDeleteComment globally accessible
window.handleDeleteComment = handleDeleteComment;

// Render comments
function renderComments(postId) {
    const comments = getComments(postId);
    const commentsList = document.getElementById('comments-list');
    
    if (comments.length === 0) {
        commentsList.innerHTML = '<p style="color: #6b7280; text-align: center; padding: 2rem;">No comments yet. Be the first to comment!</p>';
        return;
    }
    
    commentsList.innerHTML = comments.map(comment => `
        <div class="comment">
            <div class="comment-header">
                <strong class="comment-author">${comment.name}</strong>
                <span class="comment-date">${comment.date}</span>
            </div>
            <div class="comment-body">
                ${comment.text}
            </div>
        </div>
    `).join('');
}

// Add new comment
function addComment(postId, name, text) {
    const comments = getComments(postId);
    const newComment = {
        id: Date.now(),
        name: name,
        text: text,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    comments.push(newComment);
    saveComments(postId, comments);
    renderComments(postId);
}

// Load related posts
function loadRelatedPosts(currentPostId) {
    const allPosts = getBlogPosts();
    const relatedPostsGrid = document.getElementById('related-posts-grid');
    
    // Get 3 random posts excluding current post
    const otherPosts = allPosts.filter(post => post.id !== currentPostId);
    const shuffled = otherPosts.sort(() => 0.5 - Math.random());
    const relatedPosts = shuffled.slice(0, 3);
    
    if (relatedPosts.length === 0) {
        relatedPostsGrid.innerHTML = '<p style="text-align: center; color: var(--text-light);">No related posts available.</p>';
        return;
    }
    
    relatedPostsGrid.innerHTML = relatedPosts.map(post => {
        const readingTime = Math.ceil((post.content ? post.content.trim().split(/\s+/).length : 0) / 200);
        return `
            <a href="blog-post.html?id=${post.id}" class="related-post-card">
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

// Get post ID from URL
function getPostIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

// Scroll Progress - REMOVED

// Load and display blog post
document.addEventListener('DOMContentLoaded', function() {
    const postId = getPostIdFromUrl();
    
    if (!postId) {
        // No ID provided, redirect to blog page
        window.location.href = 'blog.html';
        return;
    }
    
    const posts = getBlogPosts();
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
        // Post not found
        document.getElementById('post-title').textContent = 'Post Not Found';
        document.getElementById('post-content').innerHTML = '<p>Sorry, this blog post could not be found.</p><p><a href="blog.html">Return to blog</a></p>';
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
    
    // Increment and get view count
    const views = incrementPostViews(postId);
    
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
    
    const likes = getPostLikes(postId);
    const liked = isPostLiked(postId);
    
    likeCount.textContent = likes;
    
    if (liked) {
        likeButton.classList.add('liked');
        heartIcon.textContent = '♥';
        likeText.textContent = 'Liked';
    }
    
    likeButton.addEventListener('click', function() {
        const nowLiked = toggleLike(postId);
        const newLikes = getPostLikes(postId);
        
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
    loadRelatedPosts(postId);
    
    // Load comments
    renderComments(postId);
    
    // Handle comment form submission
    document.getElementById('comment-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('comment-name').value.trim();
        const text = document.getElementById('comment-text').value.trim();
        
        if (name && text) {
            addComment(postId, name, text);
            
            // Clear form
            document.getElementById('comment-name').value = '';
            document.getElementById('comment-text').value = '';
            
            // Show success message
            if (typeof showToast === 'function') {
                showToast('Your comment has been posted successfully!', 'success');
            }
        }
    });
});
