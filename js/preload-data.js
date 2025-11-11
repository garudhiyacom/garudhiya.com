// Preload data in the background for faster navigation
(function() {
    'use strict';
    
    // Preload blog posts if not on blog page
    function preloadBlogPosts() {
        if (window.location.pathname.includes('blog')) return;
        
        // Check if cache is fresh
        const cacheTime = localStorage.getItem('blogPostsCacheTime_v1');
        if (cacheTime) {
            const age = Date.now() - parseInt(cacheTime);
            if (age < 60 * 60 * 1000) { // Less than 1 hour
                console.log('✅ Blog posts already cached');
                return;
            }
        }
        
        // Preload in background
        console.log('🔄 Preloading blog posts in background...');
        if (typeof getBlogPostsFromFirebase === 'function') {
            getBlogPostsFromFirebase().then(posts => {
                localStorage.setItem('blogPostsCache_v1', JSON.stringify(posts));
                localStorage.setItem('blogPostsCacheTime_v1', Date.now().toString());
                console.log('✅ Blog posts preloaded (' + posts.length + ' posts)');
            }).catch(err => {
                console.warn('Failed to preload blog posts:', err);
            });
        }
    }
    
    // Preload products if not on products page
    function preloadProducts() {
        if (window.location.pathname.includes('product')) return;
        
        // Check if cache is fresh
        const cacheTime = localStorage.getItem('productsCacheTime_v1');
        if (cacheTime) {
            const age = Date.now() - parseInt(cacheTime);
            if (age < 60 * 60 * 1000) { // Less than 1 hour
                console.log('✅ Products already cached');
                return;
            }
        }
        
        // Preload in background
        console.log('🔄 Preloading products in background...');
        if (typeof getProductsFromFirebase === 'function') {
            getProductsFromFirebase().then(products => {
                localStorage.setItem('productsCache_v1', JSON.stringify(products));
                localStorage.setItem('productsCacheTime_v1', Date.now().toString());
                console.log('✅ Products preloaded (' + products.length + ' products)');
            }).catch(err => {
                console.warn('Failed to preload products:', err);
            });
        }
    }
    
    // Start preloading after page is fully loaded
    if (document.readyState === 'complete') {
        setTimeout(() => {
            preloadBlogPosts();
            preloadProducts();
        }, 2000); // Wait 2 seconds after page load
    } else {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloadBlogPosts();
                preloadProducts();
            }, 2000);
        });
    }
})();
