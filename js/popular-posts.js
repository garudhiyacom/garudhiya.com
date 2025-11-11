// Load Popular Posts on Homepage
(function() {
    // Cache for popular posts (10 minutes)
    let popularPostsCache = null;
    let popularPostsCacheTime = 0;
    const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
    const CACHE_VERSION = 'v3'; // v3 - hash-based clean URLs
    
    // Clear old cache on version change
    const storedVersion = localStorage.getItem('popularPostsCacheVersion');
    if (storedVersion !== CACHE_VERSION) {
        localStorage.removeItem('popularPostsCache');
        localStorage.setItem('popularPostsCacheVersion', CACHE_VERSION);
    }
    
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
    
    async function loadPopularPosts() {
        const popularPostsGrid = document.getElementById('popular-posts-grid');
        
        if (!popularPostsGrid) return;
        
        // Check cache first
        const now = Date.now();
        if (popularPostsCache && (now - popularPostsCacheTime) < CACHE_DURATION) {
            console.log('📦 Using cached popular posts');
            popularPostsGrid.innerHTML = popularPostsCache;
            return;
        }
        
        // Get all blog posts from Firebase
        let allPosts = [];
        try {
            if (typeof getBlogPostsFromFirebase === 'function') {
                allPosts = await getBlogPostsFromFirebase();
            } else {
                // Fallback to localStorage
                const stored = localStorage.getItem('blogPosts');
                allPosts = stored ? JSON.parse(stored) : [];
            }
        } catch (error) {
            console.error('Error loading posts:', error);
            const stored = localStorage.getItem('blogPosts');
            allPosts = stored ? JSON.parse(stored) : [];
        }
        
        if (allPosts.length === 0) {
            popularPostsGrid.innerHTML = '<p style="text-align: center; color: var(--text-light);">No posts available yet.</p>';
            return;
        }
        
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
        const html = sortedPosts.map((post, index) => {
            const readingTime = calculateReadingTime(post.content);
            const badges = ['🔥 Most Popular', '⭐ Trending', '👍 Popular'];
            
            return `
                <a href="blog#${post.id}" class="popular-post-card">
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
        
        // Cache the rendered HTML
        popularPostsCache = html;
        popularPostsCacheTime = now;
        
        popularPostsGrid.innerHTML = html;
    }
    
    // Load when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadPopularPosts);
    } else {
        loadPopularPosts();
    }
})();
