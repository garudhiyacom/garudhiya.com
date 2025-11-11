// Admin Comments Management
(function() {
    // Check if user is authenticated
    if (!localStorage.getItem('adminAuth')) {
        window.location.href = 'admin.html';
        return;
    }

    async function getAllComments() {
        try {
            return await getAllCommentsFromFirebase();
        } catch (error) {
            console.error('Error getting comments:', error);
            return [];
        }
    }

    async function getBlogPosts() {
        try {
            return await getBlogPostsFromFirebase();
        } catch (error) {
            console.error('Error getting blog posts:', error);
            return [];
        }
    }

    async function deleteComment(commentId) {
        try {
            await deleteCommentFromFirebase(commentId);
            await loadComments();
            if (typeof showToast === 'function') {
                showToast('Comment deleted successfully', 'success');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
            if (typeof showToast === 'function') {
                showToast('Error deleting comment', 'error');
            }
        }
    }

    async function handleDeleteComment(commentId, postTitle) {
        if (typeof showConfirm !== 'function') {
            if (confirm('Are you sure you want to delete this comment?')) {
                await deleteComment(commentId);
            }
            return;
        }

        const confirmed = await showConfirm(
            'Delete Comment?',
            `Are you sure you want to delete this comment from "${postTitle}"? This action cannot be undone.`,
            'Delete',
            'Cancel'
        );

        if (confirmed) {
            await deleteComment(commentId);
        }
    }

    async function loadComments() {
        const commentsList = document.getElementById('comments-list');
        if (!commentsList) return;

        commentsList.innerHTML = '<div class="loading">Loading comments...</div>';

        try {
            const allComments = await getAllComments();
            const blogPosts = await getBlogPosts();
            
            // Create a map of post IDs to titles
            const postTitles = {};
            blogPosts.forEach(post => {
                postTitles[post.id] = post.title;
            });

            // Group comments by postId
            const commentsByPost = {};
            allComments.forEach(comment => {
                if (!commentsByPost[comment.postId]) {
                    commentsByPost[comment.postId] = [];
                }
                commentsByPost[comment.postId].push(comment);
            });

            let html = '';
            let totalComments = allComments.length;

            // Loop through all posts with comments
            for (const postId in commentsByPost) {
                const comments = commentsByPost[postId];
                if (comments && comments.length > 0) {
                    const postTitle = postTitles[postId] || 'Unknown Post';

                    html += `
                        <div class="admin-comment-group">
                            <h3 class="admin-comment-post-title">
                                📝 ${postTitle}
                                <span class="comment-count">(${comments.length} comment${comments.length !== 1 ? 's' : ''})</span>
                            </h3>
                            <div class="admin-comments-list">
                    `;

                    comments.forEach((comment) => {
                        const commentDate = comment.date || new Date(comment.timestamp).toLocaleDateString();
                        const commentText = comment.text || comment.comment || '';
                        const commentName = comment.name || comment.author || 'Anonymous';
                        
                        html += `
                            <div class="admin-comment-item">
                                <div class="admin-comment-header">
                                    <div>
                                        <strong>${commentName}</strong>
                                        <span class="admin-comment-date">${commentDate}</span>
                                    </div>
                                    <button 
                                        class="btn-delete" 
                                        onclick="handleAdminDeleteComment('${comment.id}', '${postTitle.replace(/'/g, "\\'")}')"
                                        title="Delete comment">
                                        🗑️ Delete
                                    </button>
                                </div>
                                <div class="admin-comment-text">${commentText}</div>
                            </div>
                        `;
                    });

                    html += `
                            </div>
                        </div>
                    `;
                }
            }

            if (totalComments === 0) {
                commentsList.innerHTML = `
                    <div class="empty-state">
                        <p>💬 No comments yet</p>
                        <p style="color: #6b7280;">Comments from blog posts will appear here</p>
                    </div>
                `;
            } else {
                commentsList.innerHTML = html;
            }
        } catch (error) {
            console.error('Error loading comments:', error);
            commentsList.innerHTML = `
                <div class="empty-state">
                    <p>❌ Error loading comments</p>
                    <p style="color: #6b7280;">${error.message}</p>
                </div>
            `;
        }
    }

    // Make functions globally accessible
    window.handleAdminDeleteComment = handleDeleteComment;
    window.loadAdminComments = loadComments;

    // Load comments when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadComments);
    } else {
        loadComments();
    }
})();
