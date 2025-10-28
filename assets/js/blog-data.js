// ========================================
// BLOG PAGE FUNCTIONS
// ========================================

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

// Load all blog cards on blog.html
function loadBlogCards() {
    const main = document.querySelector('main');
    if (!main) return;
    
    if (!posts || posts.length === 0) {
        main.innerHTML = '<article><h2>No blog posts available</h2><p>Check back soon for new content!</p></article>';
        return;
    }
    
    posts.forEach(post => {
        const article = document.createElement('article');
        article.innerHTML = createBlogCard(post);
        main.appendChild(article);
    });
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
