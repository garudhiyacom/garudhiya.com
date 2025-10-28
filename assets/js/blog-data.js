// ========================================
// BLOG PAGE FUNCTIONS
// ========================================

// Current page state
let currentPage = 1;
const postsPerPage = 12;

// Create blog card HTML
function createBlogCard(post) {
    return `
        <h2>${post.title}</h2>
        <img src="${post.img}" alt="${post.title}" onerror="this.src='assets/images/placeholder.jpg'">
        <p>${post.excerpt}</p>
        <p>By ${post.author} on ${post.date}</p>
        <a href="blog-details.html?id=${post.id}">Read More</a>
    `;
}

// Create pagination HTML
function createPagination(currentPage, totalPages) {
    let html = '<div class="pagination" style="display: flex; justify-content: center; gap: 10px; margin-top: 30px; flex-wrap: wrap;">';
    
    // Previous button
    if (currentPage > 1) {
        html += `<button onclick="goToPage(${currentPage - 1})" style="padding: 10px 15px; background-color: #333; color: white; border: none; cursor: pointer;">← Previous</button>`;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage;
        const bgColor = isActive ? '#555' : '#333';
        html += `<button onclick="goToPage(${i})" style="padding: 10px 15px; background-color: ${bgColor}; color: white; border: none; cursor: pointer;">${i}</button>`;
    }
    
    // Next button
    if (currentPage < totalPages) {
        html += `<button onclick="goToPage(${currentPage + 1})" style="padding: 10px 15px; background-color: #333; color: white; border: none; cursor: pointer;">Next →</button>`;
    }
    
    html += '</div>';
    return html;
}

// Load blog cards for specific page
function loadBlogCards(page = 1) {
    const main = document.querySelector('main');
    if (!main) return;
    
    if (!posts || posts.length === 0) {
        main.innerHTML = '<article><h2>No blog posts available</h2><p>Check back soon for new content!</p></article>';
        return;
    }
    
    currentPage = page;
    main.innerHTML = ''; // Clear existing content
    
    // Get posts for current page
    const paginatedPosts = getPaginatedPosts(currentPage, postsPerPage);
    
    // Add each post
    paginatedPosts.forEach(post => {
        const article = document.createElement('article');
        article.innerHTML = createBlogCard(post);
        main.appendChild(article);
    });
    
    // Add pagination
    const totalPages = getTotalPages(postsPerPage);
    if (totalPages > 1) {
        const paginationDiv = document.createElement('div');
        paginationDiv.innerHTML = createPagination(currentPage, totalPages);
        main.appendChild(paginationDiv);
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigate to specific page
function goToPage(page) {
    loadBlogCards(page);
}

// ========================================
// BLOG DETAILS PAGE FUNCTIONS
// ========================================

// Create blog details HTML
function createBlogDetails(post) {
    return `
        <article>
            <h2>${post.title}</h2>
            <img src="${post.img}" alt="${post.title}" onerror="this.src='assets/images/placeholder.jpg'">
            <p>By ${post.author} on ${post.date}</p>
            <div style="white-space: pre-line;">${post.content}</div>
            <a href="blog.html" style="margin-top: 20px;">← Back to Blog</a>
        </article>
    `;
}

// Display error message
function displayBlogError(message) {
    return `
        <article>
            <h2>Error</h2>
            <p>${message}</p>
            <a href="blog.html">← Back to Blog</a>
        </article>
    `;
}

// Load blog details on blog-details.html
function loadBlogDetails() {
    const main = document.querySelector('main');
    if (!main) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (!postId) {
        main.innerHTML = displayBlogError('No blog post ID provided');
        return;
    }
    
    const post = getPostById(postId);
    
    if (post) {
        main.innerHTML = createBlogDetails(post);
        document.title = `Garudhiya - ${post.title}`;
    } else {
        main.innerHTML = displayBlogError('Blog post not found');
    }
}

// ========================================
// PAGE INITIALIZATION
// ========================================

// Initialize based on current page
function initBlogPage() {
    const path = window.location.pathname;
    
    if (path.includes('blog.html')) {
        loadBlogCards();
    } else if (path.includes('blog-details.html')) {
        loadBlogDetails();
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', initBlogPage);
