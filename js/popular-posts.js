// Load Popular Posts on Homepage
(function() {
    function getPostViews(postId) {
        const stored = localStorage.getItem('postViews');
        const allViews = stored ? JSON.parse(stored) : {};
        return allViews[postId] || 0;
    }
    
    function calculateReadingTime(content) {
        if (!content) return 1;
        const wordsPerMinute = 200;
        const wordCount = content.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        return readingTime;
    }
    
    function loadPopularPosts() {
        const popularPostsGrid = document.getElementById('popular-posts-grid');
        
        if (!popularPostsGrid) return;
        
        // Get all blog posts
        const stored = localStorage.getItem('blogPosts');
        if (!stored) {
            popularPostsGrid.innerHTML = '<p style="text-align: center; color: var(--text-light);">No posts available yet.</p>';
            return;
        }
        
        const allPosts = JSON.parse(stored);
        
        // Sort by view count
        const sortedPosts = allPosts
            .map(post => ({
                ...post,
                views: getPostViews(post.id)
            }))
            .sort((a, b) => b.views - a.views)
            .slice(0, 3); // Get top 3
        
        if (sortedPosts.length === 0) {
            popularPostsGrid.innerHTML = '<p style="text-align: center; color: var(--text-light);">No posts available yet.</p>';
            return;
        }
        
        // Render popular posts
        popularPostsGrid.innerHTML = sortedPosts.map((post, index) => {
            const readingTime = calculateReadingTime(post.content);
            const badges = ['🔥 Most Popular', '⭐ Trending', '👍 Popular'];
            
            return `
                <a href="blog-post.html?id=${post.id}" class="popular-post-card">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                    <div class="popular-post-content">
                        <span class="popular-post-badge">${badges[index] || '📖 Popular'}</span>
                        <div class="popular-post-meta">${post.date} • ${readingTime} min read • ${post.views} views</div>
                        <h3>${post.title}</h3>
                        <p>${post.excerpt}</p>
                    </div>
                </a>
            `;
        }).join('');
    }
    
    // Load when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadPopularPosts);
    } else {
        loadPopularPosts();
    }
})();
