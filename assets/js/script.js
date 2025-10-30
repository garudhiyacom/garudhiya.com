// Main script file
document.addEventListener('DOMContentLoaded', function() {
    console.log('Garudhiya website loaded');
    
    // Initialize blog page if elements exist
    if (document.querySelector('.blog-grid')) {
        initBlogPage();
    }
    
    // Initialize blog detail page if element exists
    if (document.getElementById('blog-detail')) {
        initBlogDetailPage();
    }
    
    // Initialize products page if elements exist
    if (document.querySelector('.products-grid')) {
        initProductsPage();
    }
    
    // Initialize product detail page if element exists
    if (document.getElementById('product-detail')) {
        initProductDetailPage();
    }
    
    // Initialize global search on home and contact pages
    const globalSearch = document.getElementById('global-search');
    if (globalSearch) {
        globalSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performGlobalSearch();
            }
        });
    }
    
    // Initialize header search on all pages
    const headerSearch = document.getElementById('header-search');
    if (headerSearch) {
        headerSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performHeaderSearch();
            }
        });
    }
});

// Blog page functionality
function initBlogPage() {
    const postsPerPage = 9;
    let currentPage = 1;
    let filteredPosts = [...blogPosts];
    
    // Header search functionality for blog filtering
    const headerSearch = document.getElementById('header-search');
    if (headerSearch) {
        headerSearch.addEventListener('input', (e) => {
            filterPosts(e.target.value);
        });
    }
    
    function filterPosts(searchTerm = '') {
        searchTerm = searchTerm.toLowerCase();
        
        filteredPosts = blogPosts.filter(post => {
            return post.title.toLowerCase().includes(searchTerm) || 
                   post.excerpt.toLowerCase().includes(searchTerm) ||
                   post.author.toLowerCase().includes(searchTerm);
        });
        
        currentPage = 1;
        loadBlogPosts(1);
    }
    
    function loadBlogPosts(page = 1) {
        const blogGrid = document.querySelector('.blog-grid');
        if (!blogGrid) return;

        // Sort posts by date (newest first)
        const sortedPosts = [...filteredPosts].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const postsToShow = sortedPosts.slice(startIndex, endIndex);

        blogGrid.innerHTML = '';
        
        if (postsToShow.length === 0) {
            blogGrid.innerHTML = '<p class="no-results">No blog posts found matching your search.</p>';
            document.querySelector('.pagination').innerHTML = '';
            return;
        }

        postsToShow.forEach(post => {
            const postHTML = `
                <article class="blog-post">
                    <div class="post-image">
                        <img src="${post.image}" alt="${post.title}">
                    </div>
                    <div class="post-content">
                        <span class="post-date">${post.date}</span>
                        <h2>${post.title}</h2>
                        <p>${post.excerpt}</p>
                        <a href="blog-details.html?id=${post.id}" class="read-more">Read More →</a>
                    </div>
                </article>
            `;
            blogGrid.innerHTML += postHTML;
        });

        updatePagination(page);
    }

    function updatePagination(page) {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        const pagination = document.querySelector('.pagination');
        if (!pagination) return;

        pagination.innerHTML = '';
        
        if (totalPages <= 1) return;

        // Previous button
        const prevLink = document.createElement('a');
        prevLink.href = '#';
        prevLink.className = `page-link ${page === 1 ? 'disabled' : ''}`;
        prevLink.textContent = '« Previous';
        prevLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (page > 1) {
                currentPage = page - 1;
                loadBlogPosts(currentPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        pagination.appendChild(prevLink);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.className = `page-link ${i === page ? 'active' : ''}`;
            pageLink.textContent = i;
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                loadBlogPosts(currentPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            pagination.appendChild(pageLink);
        }

        // Next button
        const nextLink = document.createElement('a');
        nextLink.href = '#';
        nextLink.className = `page-link ${page === totalPages ? 'disabled' : ''}`;
        nextLink.textContent = 'Next »';
        nextLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (page < totalPages) {
                currentPage = page + 1;
                loadBlogPosts(currentPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        pagination.appendChild(nextLink);
    }
    
    loadBlogPosts(currentPage);
}

// Blog detail page functionality
function initBlogDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));
    
    if (typeof blogPosts === 'undefined') return;
    
    const post = blogPosts.find(p => p.id === postId);
    const blogDetail = document.getElementById('blog-detail');
    
    if (!post) {
        blogDetail.innerHTML = `
            <div class="error-message">
                <h2>Post Not Found</h2>
                <p>Sorry, the blog post you're looking for doesn't exist.</p>
                <a href="blog.html" class="btn">Back to Blog</a>
            </div>
        `;
        return;
    }
    
    // Update page title
    document.title = `${post.title} - Garudhiya Blog`;
    
    // Load post content
    blogDetail.innerHTML = `
        <div class="blog-detail-header">
            <img src="${post.imageDetail}" alt="${post.title}" class="blog-detail-image">
            <div class="blog-detail-meta">
                <span class="post-date">${post.date}</span>
                <span class="post-author">By ${post.author}</span>
            </div>
            <h1 class="blog-detail-title">${post.title}</h1>
        </div>
        
        <div class="blog-detail-content">
            ${post.content}
        </div>
        
        <div class="blog-detail-footer">
            <a href="blog.html" class="btn">← Back to Blog</a>
        </div>
    `;
}

// Global search function (for home and contact pages)
function performGlobalSearch() {
    const searchInput = document.getElementById('global-search');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        alert('Please enter a search term');
        return;
    }
    
    // Search in products
    let productResults = [];
    if (typeof products !== 'undefined') {
        productResults = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.excerpt.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    
    // Search in blog posts
    let blogResults = [];
    if (typeof blogPosts !== 'undefined') {
        blogResults = blogPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) || 
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.author.toLowerCase().includes(searchTerm)
        );
    }
    
    displaySearchResults(searchTerm, productResults, blogResults);
}

// Header search function (redirects to appropriate page or shows results)
function performHeaderSearch() {
    const searchInput = document.getElementById('header-search');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        return;
    }
    
    // Get current page
    const currentPath = window.location.pathname;
    
    // If on home or contact page, show global results
    if (currentPath.includes('index.html') || currentPath.includes('contact.html') || currentPath === '/') {
        // Search in products
        let productResults = [];
        if (typeof products !== 'undefined') {
            productResults = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) || 
                product.excerpt.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
        }
        
        // Search in blog posts
        let blogResults = [];
        if (typeof blogPosts !== 'undefined') {
            blogResults = blogPosts.filter(post => 
                post.title.toLowerCase().includes(searchTerm) || 
                post.excerpt.toLowerCase().includes(searchTerm) ||
                post.author.toLowerCase().includes(searchTerm)
            );
        }
        
        displaySearchResults(searchTerm, productResults, blogResults);
    }
    // If on products or blog page, filtering is already handled by input event
}

function displaySearchResults(searchTerm, productResults, blogResults) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;
    
    let resultsHTML = `<div class="search-results-container">
        <h2>Search Results for: "${searchTerm}"</h2>`;
    
    // Display product results
    if (productResults.length > 0) {
        resultsHTML += `<div class="results-section">
            <h3>Products (${productResults.length})</h3>
            <div class="results-grid">`;
        
        productResults.slice(0, 6).forEach(product => {
            resultsHTML += `
                <div class="result-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h4>${product.name}</h4>
                    <p class="result-price">${product.price}</p>
                    <a href="products.html" class="btn-small">View in Products</a>
                </div>`;
        });
        
        resultsHTML += `</div></div>`;
    }
    
    // Display blog results
    if (blogResults.length > 0) {
        resultsHTML += `<div class="results-section">
            <h3>Blog Posts (${blogResults.length})</h3>
            <div class="results-list">`;
        
        blogResults.slice(0, 6).forEach(post => {
            resultsHTML += `
                <div class="result-item">
                    <h4>${post.title}</h4>
                    <p class="result-date">${post.date} • By ${post.author}</p>
                    <p>${post.excerpt}</p>
                    <a href="blog-details.html?id=${post.id}" class="read-more">Read More →</a>
                </div>`;
        });
        
        resultsHTML += `</div></div>`;
    }
    
    // No results
    if (productResults.length === 0 && blogResults.length === 0) {
        resultsHTML += `<p class="no-results">No results found for "${searchTerm}". Try a different search term.</p>`;
    }
    
    resultsHTML += `</div>`;
    resultsContainer.innerHTML = resultsHTML;
}

// Products page functionality
function initProductsPage() {
    const productsPerPage = 9;
    let currentPage = 1;
    let filteredProducts = [...products];
    
    // Populate category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        const categories = [...new Set(products.map(p => p.category))];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }
    
    // Header search functionality for product filtering
    const headerSearch = document.getElementById('header-search');
    if (headerSearch) {
        headerSearch.addEventListener('input', (e) => {
            filterProducts(e.target.value);
        });
    }
    
    // Category filter functionality
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            filterProducts();
        });
    }
    
    function filterProducts(searchTerm = '') {
        if (!searchTerm && headerSearch) {
            searchTerm = headerSearch.value;
        }
        searchTerm = searchTerm.toLowerCase();
        const selectedCategory = categoryFilter ? categoryFilter.value : '';
        
        filteredProducts = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                                  product.excerpt.toLowerCase().includes(searchTerm);
            const matchesCategory = !selectedCategory || product.category === selectedCategory;
            
            return matchesSearch && matchesCategory;
        });
        
        currentPage = 1;
        loadProducts(1);
    }
    
    function loadProducts(page = 1) {
        const productsGrid = document.querySelector('.products-grid');
        if (!productsGrid) return;

        // Sort products by date (newest first)
        const sortedProducts = [...filteredProducts].sort((a, b) => {
            return new Date(b.dateAdded) - new Date(a.dateAdded);
        });

        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToShow = sortedProducts.slice(startIndex, endIndex);

        productsGrid.innerHTML = '';
        
        if (productsToShow.length === 0) {
            productsGrid.innerHTML = '<p class="no-results">No products found matching your search.</p>';
            document.querySelector('.pagination').innerHTML = '';
            return;
        }

        productsToShow.forEach(product => {
            const productHTML = `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                        <span class="product-category">${product.category}</span>
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="product-excerpt">${product.excerpt}</p>
                        <div class="product-footer">
                            <span class="product-price">${product.price}</span>
                            <button class="btn-primary" onclick="buyProduct(${product.id})">Buy Now</button>
                        </div>
                    </div>
                </div>
            `;
            productsGrid.innerHTML += productHTML;
        });

        updateProductPagination(page);
    }

    function updateProductPagination(page) {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        const pagination = document.querySelector('.pagination');
        if (!pagination) return;

        pagination.innerHTML = '';
        
        if (totalPages <= 1) return;

        // Previous button
        const prevLink = document.createElement('a');
        prevLink.href = '#';
        prevLink.className = `page-link ${page === 1 ? 'disabled' : ''}`;
        prevLink.textContent = '« Previous';
        prevLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (page > 1) {
                currentPage = page - 1;
                loadProducts(currentPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        pagination.appendChild(prevLink);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.className = `page-link ${i === page ? 'active' : ''}`;
            pageLink.textContent = i;
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                loadProducts(currentPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            pagination.appendChild(pageLink);
        }

        // Next button
        const nextLink = document.createElement('a');
        nextLink.href = '#';
        nextLink.className = `page-link ${page === totalPages ? 'disabled' : ''}`;
        nextLink.textContent = 'Next »';
        nextLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (page < totalPages) {
                currentPage = page + 1;
                loadProducts(currentPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        pagination.appendChild(nextLink);
    }
    
    loadProducts(currentPage);
}

// Buy product function
function buyProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`You are buying: ${product.name}\nPrice: ${product.price}\n\nThis is a demo. Integrate with your payment system.`);
        // Add your payment/checkout logic here
    }
}

// Product detail page functionality
function initProductDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (typeof products === 'undefined') return;
    
    const product = products.find(p => p.id === productId);
    const productDetail = document.getElementById('product-detail');
    
    if (!product) {
        productDetail.innerHTML = `
            <div class="error-message">
                <h2>Product Not Found</h2>
                <p>Sorry, the product you're looking for doesn't exist.</p>
                <a href="products.html" class="btn">Back to Products</a>
            </div>
        `;
        return;
    }
    
    // Update page title
    document.title = `${product.name} - Garudhiya`;
    
    // Load product content
    productDetail.innerHTML = `
        <div class="product-detail-container">
            <div class="product-detail-image">
                <img src="${product.imageDetail}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <span class="product-category-badge">${product.category}</span>
                <h1 class="product-detail-title">${product.name}</h1>
                <p class="product-detail-price">${product.price}</p>
                <div class="product-detail-description">
                    ${product.description}
                </div>
                <div class="product-actions">
                    <button class="btn btn-large">Add to Cart</button>
                    <button class="btn btn-secondary btn-large">Buy Now</button>
                </div>
            </div>
        </div>
        
        <div class="product-detail-footer">
            <a href="products.html" class="btn">← Back to Products</a>
        </div>
    `;
}
