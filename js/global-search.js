// Global Search Functionality
(function() {
    const searchInput = document.getElementById('global-search');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) return;
    
    let searchTimeout;
    
    // Get data from localStorage
    function getProducts() {
        const stored = localStorage.getItem('products');
        return stored ? JSON.parse(stored) : [];
    }
    
    function getBlogPosts() {
        const stored = localStorage.getItem('blogPosts');
        return stored ? JSON.parse(stored) : [];
    }
    
    // Search function
    function performSearch(query) {
        if (!query || query.length < 2) {
            searchResults.classList.remove('active');
            return;
        }
        
        const lowerQuery = query.toLowerCase();
        const products = getProducts();
        const blogPosts = getBlogPosts();
        
        // Search products
        const productResults = products.filter(product =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery)
        ).slice(0, 3); // Limit to 3 results
        
        // Search blog posts
        const blogResults = blogPosts.filter(post =>
            post.title.toLowerCase().includes(lowerQuery) ||
            post.excerpt.toLowerCase().includes(lowerQuery) ||
            (post.content && post.content.toLowerCase().includes(lowerQuery))
        ).slice(0, 3); // Limit to 3 results
        
        displayResults(productResults, blogResults, query);
    }
    
    // Display search results
    function displayResults(products, posts, query) {
        if (products.length === 0 && posts.length === 0) {
            searchResults.innerHTML = `
                <div class="search-no-results">
                    No results found for "${query}"
                </div>
            `;
            searchResults.classList.add('active');
            return;
        }
        
        let html = '';
        
        // Products section
        if (products.length > 0) {
            html += '<div class="search-section"><h4>Products</h4>';
            products.forEach(product => {
                html += `
                    <a href="products.html" class="search-result-item">
                        <strong>${product.name}</strong>
                        <span>${product.price}</span>
                    </a>
                `;
            });
            html += '</div>';
        }
        
        // Blog posts section
        if (posts.length > 0) {
            html += '<div class="search-section"><h4>Blog Posts</h4>';
            posts.forEach(post => {
                html += `
                    <a href="blog-post.html?id=${post.id}" class="search-result-item">
                        <strong>${post.title}</strong>
                        <span>${post.date}</span>
                    </a>
                `;
            });
            html += '</div>';
        }
        
        searchResults.innerHTML = html;
        searchResults.classList.add('active');
    }
    
    // Save recent searches
    function saveRecentSearch(query) {
        const stored = localStorage.getItem('recentSearches');
        let recent = stored ? JSON.parse(stored) : [];
        
        // Remove if already exists
        recent = recent.filter(q => q.toLowerCase() !== query.toLowerCase());
        
        // Add to beginning
        recent.unshift(query);
        
        // Keep only last 5
        recent = recent.slice(0, 5);
        
        localStorage.setItem('recentSearches', JSON.stringify(recent));
    }
    
    function getRecentSearches() {
        const stored = localStorage.getItem('recentSearches');
        return stored ? JSON.parse(stored) : [];
    }
    
    function showRecentSearches() {
        const recent = getRecentSearches();
        
        if (recent.length === 0) {
            searchResults.classList.remove('active');
            return;
        }
        
        let html = '<div class="search-section"><h4>Recent Searches</h4>';
        recent.forEach(query => {
            html += `
                <a href="#" class="search-result-item recent-search" data-query="${query}">
                    <strong>🕐 ${query}</strong>
                </a>
            `;
        });
        html += '</div>';
        
        searchResults.innerHTML = html;
        searchResults.classList.add('active');
        
        // Add click handlers for recent searches
        searchResults.querySelectorAll('.recent-search').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const query = this.getAttribute('data-query');
                searchInput.value = query;
                performSearch(query);
            });
        });
    }
    
    // Event listeners
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            searchResults.classList.remove('active');
            return;
        }
        
        // Debounce search
        searchTimeout = setTimeout(() => {
            performSearch(query);
            if (query.length >= 3) {
                saveRecentSearch(query);
            }
        }, 300);
    });
    
    searchInput.addEventListener('focus', function() {
        const query = this.value.trim();
        if (query.length >= 2) {
            performSearch(query);
        } else {
            showRecentSearches();
        }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
    
    // Prevent closing when clicking inside search results
    searchResults.addEventListener('click', function(e) {
        e.stopPropagation();
    });
})();
