// ========================================
// BLOG PAGE - LIST VIEW
// ========================================

let currentPage = 1;
const postsPerPage = 12;

function createBlogCard(post) {
    return `
        <img src="${post.img}" alt="${post.title}" onerror="this.src='assets/images/placeholder.jpg'">
        <h2>${post.title}</h2>
        <p>${post.excerpt}</p>
        <p><small>By ${post.author} on ${post.date}</small></p>
        <a href="blog-details.html?id=${post.id}">Read More</a>
    `;
}

function createPagination(currentPage, totalPages) {
    let html = '<div class="pagination">';
    
    if (currentPage > 1) {
        html += `<button onclick="goToPage(${currentPage - 1})">← Previous</button>`;
    }
    
    for (let i = 1; i <= totalPages; i++) {
        const activeStyle = i === currentPage ? ' style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"' : '';
        html += `<button onclick="goToPage(${i})"${activeStyle}>${i}</button>`;
    }
    
    if (currentPage < totalPages) {
        html += `<button onclick="goToPage(${currentPage + 1})">Next →</button>`;
    }
    
    html += '</div>';
    return html;
}

function loadBlogCards(page = 1) {
    const main = document.querySelector('main');
    if (!main || !posts || posts.length === 0) {
        main.innerHTML = '<article class="message"><h2>No blog posts available</h2><p>Check back soon!</p></article>';
        return;
    }
    
    currentPage = page;
    main.innerHTML = '';
    
    const grid = document.createElement('div');
    grid.className = 'card-grid';
    
    const paginatedPosts = getPaginatedPosts(currentPage, postsPerPage);
    paginatedPosts.forEach(post => {
        const article = document.createElement('article');
        article.innerHTML = createBlogCard(post);
        grid.appendChild(article);
    });
    
    main.appendChild(grid);
    
    const totalPages = getTotalPages(postsPerPage);
    if (totalPages > 1) {
        const paginationDiv = document.createElement('div');
        paginationDiv.innerHTML = createPagination(currentPage, totalPages);
        main.appendChild(paginationDiv);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToPage(page) {
    loadBlogCards(page);
}

// ========================================
// BLOG DETAILS PAGE - SINGLE VIEW
// ========================================

function loadBlogDetails() {
    const main = document.querySelector('main');
    if (!main) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (!postId) {
        main.innerHTML = '<article class="message"><h2>Error</h2><p>No blog post ID provided</p><a href="blog.html">← Back to Blog</a></article>';
        return;
    }
    
    const post = getPostById(postId);
    
    if (post) {
        main.innerHTML = `
            <article class="single">
                <h2>${post.title}</h2>
                <img src="${post.img}" alt="${post.title}" onerror="this.src='assets/images/placeholder.jpg'">
                <p>By ${post.author} on ${post.date}</p>
                <div>${post.content}</div>
                <a href="blog.html">← Back to Blog</a>
            </article>
        `;
        document.title = `Garudhiya - ${post.title}`;
    } else {
        main.innerHTML = '<article class="message"><h2>Error</h2><p>Blog post not found</p><a href="blog.html">← Back to Blog</a></article>';
    }
}

// ========================================
// INITIALIZE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    
    if (path.includes('blog.html')) {
        loadBlogCards();
    } else if (path.includes('blog-details.html')) {
        loadBlogDetails();
    }
});
