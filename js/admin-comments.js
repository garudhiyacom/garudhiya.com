// Admin Comments Management
(function() {
    // Check if user is authenticated
    if (!localStorage.getItem('adminAuth')) {
        window.location.href = 'admin.html';
        return;
    }

    function getAllComments() {
        const stored = localStorage.getItem('comments');
        return stored ? JSON.parse(stored) : {};
    }

    function getBlogPosts() {
        const stored = localStorage.getItem('blogPosts');
        return stored ? JSON.parse(stored) : [];
    }

    function deleteComment(postId, commentIndex) {
        const allComments = getAllComments();
        if (allComments[postId]) {
            allComments[postId].splice(commentIndex, 1);
            localStorage.setItem('comments', JSON.stringify(allComments));
            loadComments();
            if (typeof showToast === 'function') {
                showToast('Comment deleted successfully', 'success');
            }
        }
    }

    async function handleDeleteComment(postId, commentIndex, postTitle) {
        if (typeof showConfirm !== 'function') {
            if (confirm('Are you sure you want to delete this comment?')) {
                deleteComment(postId, commentIndex);
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
            deleteComment(postId, commentIndex);
        }
    }

    function loadComments() {
        const commentsList = document.getElementById('comments-list');
        if (!commentsList) return;

        const allComments = getAllComments();
        const blogPosts = getBlogPosts();
        
        // Create a map of post IDs to titles
        const postTitles = {};
        blogPosts.forEach(post => {
            postTitles[post.id] = post.title;
        });

        let html = '';
        let totalComments = 0;

        // Loop through all posts with comments
        for (const postId in allComments) {
            const comments = allComments[postId];
            if (comments && comments.length > 0) {
                const postTitle = postTitles[postId] || 'Unknown Post';
                totalComments += comments.length;

                html += `
                    <div class="admin-comment-group">
                        <h3 class="admin-comment-post-title">
                            📝 ${postTitle}
                            <span class="comment-count">(${comments.length} comment${comments.length !== 1 ? 's' : ''})</span>
                        </h3>
                        <div class="admin-comments-list">
                `;

                comments.forEach((comment, index) => {
                    html += `
                        <div class="admin-comment-item">
                            <div class="admin-comment-header">
                                <div>
                                    <strong>${comment.name}</strong>
                                    <span class="admin-comment-date">${comment.date}</span>
                                </div>
                                <button 
                                    class="btn-delete" 
                                    onclick="handleAdminDeleteComment('${postId}', ${index}, '${postTitle.replace(/'/g, "\\'")}')"
                                    title="Delete comment">
                                    🗑️ Delete
                                </button>
                            </div>
                            <div class="admin-comment-text">${comment.text}</div>
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
    }

    // Make delete function globally accessible
    window.handleAdminDeleteComment = handleDeleteComment;

    // Load comments when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadComments);
    } else {
        loadComments();
    }
})();
