document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.blog-grid')) {
        initBlogPage();
    }
    
    if (document.getElementById('blog-detail')) {
        initBlogDetailPage();
    }
    
    if (document.querySelector('.products-grid')) {
        initProductsPage();
    }
    
    const headerSearch = document.getElementById('header-search');
    if (headerSearch) {
        headerSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performHeaderSearch();
            }
        });
    }
    
    initHamburgerMenu();
    
    initContactForm();
});

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navRight = document.querySelector('.nav-right');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (!hamburger || !navRight) return;
    
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('nav');
        if (navRight.classList.contains('active') && !nav.contains(e.target)) {
            closeMenu();
        }
    });
    
    navRight.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

function toggleMenu() {
    const navRight = document.querySelector('.nav-right');
    const hamburger = document.querySelector('.hamburger');
    navRight.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function closeMenu() {
    const navRight = document.querySelector('.nav-right');
    const hamburger = document.querySelector('.hamburger');
    navRight.classList.remove('active');
    hamburger.classList.remove('active');
}

function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite; display: inline-block; vertical-align: middle; margin-right: 8px;">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            Sending...
        `;
        
        removeFormMessage();
        
        try {
            const response = await fetch('https://formspree.io/f/xanpgvko', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showFormMessage('success', '✓ Message sent successfully! We\'ll get back to you soon.');
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }, 2000);
            } else {
                const data = await response.json();
                if (data.errors) {
                    const errorMsg = data.errors.map(error => error.message).join(', ');
                    showFormMessage('error', `✗ ${errorMsg}`);
                } else {
                    showFormMessage('error', '✗ Oops! There was a problem submitting your form. Please try again.');
                }
                
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        } catch (error) {
            showFormMessage('error', '✗ Network error! Please check your internet connection and try again.');
            
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
    
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldGroup = field.closest('.form-group');
    
    const existingError = fieldGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.classList.remove('error');
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    const fieldGroup = field.closest('.form-group');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    fieldGroup.appendChild(errorDiv);
}

function showFormMessage(type, message) {
    const contactForm = document.querySelector('.contact-form');
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.innerHTML = message;
    
    contactForm.insertBefore(messageDiv, contactForm.firstChild);
    
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
}

function removeFormMessage() {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

function initBlogPage() {
    const postsPerPage = 9;
    let currentPage = 1;
    let filteredPosts = [...blogPosts];
    
    const headerSearch = document.getElementById('header-search');
    if (headerSearch) {
        headerSearch.addEventListener('input', (e) => {
            filterPosts(e.target.value);
        });
    }
    
    function filterPosts(searchTerm = '') {
        searchTerm = searchTerm.toLowerCase().trim();
        
        if (!searchTerm) {
            filteredPosts = [...blogPosts];
        } else {
            filteredPosts = blogPosts.filter(post => {
                return post.title.toLowerCase().includes(searchTerm) || 
                       post.excerpt.toLowerCase().includes(searchTerm) ||
                       post.author.toLowerCase().includes(searchTerm);
            });
        }
        
        currentPage = 1;
        loadBlogPosts(1);
    }
    
    function loadBlogPosts(page = 1) {
        const blogGrid = document.querySelector('.blog-grid');
        if (!blogGrid) return;

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
                        <h2 onclick="window.location.href='blog-details.html?id=${post.id}'">${post.title}</h2>
                        <p>${post.excerpt}</p>
                        <a href="blog-details.html?id=${post.id}" class="read-more">Read More →</a>
                    </div>
                </article>
            `;
            blogGrid.innerHTML += postHTML;
        });

        updatePagination(page, Math.ceil(filteredPosts.length / postsPerPage), loadBlogPosts);
    }

    loadBlogPosts(currentPage);
}

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
    
    document.title = `${post.title} - Garudhiya Blog`;
    
    const authorInitial = post.author.charAt(0).toUpperCase();
    
    blogDetail.innerHTML = `
        <article class="blog-detail-article">
            <img src="${post.image}" alt="${post.title}" class="blog-detail-image">
            
            <div class="blog-detail-header">
                <div class="blog-detail-meta">
                    <span class="post-date">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        ${post.date}
                    </span>
                    <span class="post-author">
                        <span class="post-author-avatar">${authorInitial}</span>
                        ${post.author}
                    </span>
                </div>
                <h1 class="blog-detail-title">${post.title}</h1>
            </div>
            
            <div class="blog-detail-content">
                ${post.content}
            </div>
            
            <div class="blog-detail-footer">
                <a href="blog.html" class="btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back to Blog
                </a>
            </div>
        </article>
    `;
}

function performHeaderSearch() {
    const searchInput = document.getElementById('header-search');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) return;
    
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('index.html') || currentPath.includes('contact.html') || currentPath === '/') {
        let productResults = [];
        if (typeof products !== 'undefined') {
            productResults = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) || 
                product.excerpt.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
        }
        
        if (productResults.length > 0) {
            window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
        } else {
            window.location.href = `blog.html?search=${encodeURIComponent(searchTerm)}`;
        }
    }
}

function initProductsPage() {
    const productsPerPage = 9;
    let currentPage = 1;
    let filteredProducts = [...products];
    
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    
    const headerSearch = document.getElementById('header-search');
    if (headerSearch) {
        if (searchParam) {
            headerSearch.value = searchParam;
        }
        
        headerSearch.addEventListener('input', (e) => {
            filterProducts(e.target.value);
        });
    }
    
    function filterProducts(searchTerm = '') {
        searchTerm = searchTerm.toLowerCase().trim();
        
        if (!searchTerm) {
            filteredProducts = [...products];
        } else {
            filteredProducts = products.filter(product => {
                return product.name.toLowerCase().includes(searchTerm) || 
                       product.excerpt.toLowerCase().includes(searchTerm) ||
                       product.category.toLowerCase().includes(searchTerm);
            });
        }
        
        currentPage = 1;
        loadProducts(1);
    }
    
    function loadProducts(page = 1) {
        const productsGrid = document.querySelector('.products-grid');
        if (!productsGrid) return;

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

        updatePagination(page, Math.ceil(filteredProducts.length / productsPerPage), loadProducts);
    }
    
    if (searchParam) {
        filterProducts(searchParam);
    } else {
        loadProducts(currentPage);
    }
}

function updatePagination(currentPage, totalPages, loadFunction) {
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;

    pagination.innerHTML = '';
    
    if (totalPages <= 1) return;

    const prevLink = document.createElement('a');
    prevLink.href = '#';
    prevLink.className = `page-link ${currentPage === 1 ? 'disabled' : ''}`;
    prevLink.textContent = '« Previous';
    prevLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            loadFunction(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    pagination.appendChild(prevLink);

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.className = `page-link ${i === currentPage ? 'active' : ''}`;
        pageLink.textContent = i;
        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            loadFunction(i);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        pagination.appendChild(pageLink);
    }

    const nextLink = document.createElement('a');
    nextLink.href = '#';
    nextLink.className = `page-link ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLink.textContent = 'Next »';
    nextLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            loadFunction(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    pagination.appendChild(nextLink);
}

function buyProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const message = `
🛒 Product Details:
━━━━━━━━━━━━━━━━
${product.name}
${product.price}
Category: ${product.category}

${product.excerpt}
━━━━━━━━━━━━━━━━

This is a demo. In production, this would:
• Add to cart
• Process payment
• Send confirmation email
        `;
        alert(message.trim());
    }
}
