// ========================================
// HOME PAGE FUNCTIONS
// ========================================

function createGrid() {
    const grid = document.createElement('div');
    grid.className = 'card-grid';
    return grid;
}

function createSection(title) {
    const section = document.createElement('div');
    section.style.marginTop = '40px';
    section.innerHTML = `<h2 style="margin-bottom: 24px; font-size: 1.8em; font-weight: 700; color: #1a1a1a;">${title}</h2>`;
    return section;
}

function loadLatestBlog() {
    const main = document.querySelector('main');
    if (!main) return;
    
    const latestPost = getLatestPost();
    
    if (!latestPost) {
        main.innerHTML = '<article class="message"><h2>No content available</h2><p>Check back soon!</p></article>';
        return;
    }
    
    const article = document.createElement('article');
    article.className = 'single';
    article.innerHTML = `
        <h2>${latestPost.title}</h2>
        <img src="${latestPost.img}" alt="${latestPost.title}" onerror="this.src='assets/images/placeholder.jpg'">
        <p>${latestPost.excerpt}</p>
        <p><small>By ${latestPost.author} on ${latestPost.date}</small></p>
        <a href="blog-details.html?id=${latestPost.id}">Read More</a>
    `;
    main.appendChild(article);
}

function loadFeaturedPosts() {
    const main = document.querySelector('main');
    if (!main) return;
    
    const section = createSection('Featured Posts');
    const grid = createGrid();
    
    getRandomPosts(4).forEach(post => {
        const article = document.createElement('article');
        article.innerHTML = `
            <img src="${post.img}" alt="${post.title}" onerror="this.src='assets/images/placeholder.jpg'">
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <a href="blog-details.html?id=${post.id}">Read More</a>
        `;
        grid.appendChild(article);
    });
    
    section.appendChild(grid);
    main.appendChild(section);
}

function loadFeaturedProducts() {
    const main = document.querySelector('main');
    if (!main) return;
    
    const section = createSection('Our Products');
    const grid = createGrid();
    
    getRandomProducts(4).forEach(product => {
        const article = document.createElement('article');
        article.innerHTML = `
            <img src="${product.img}" alt="${product.name}" onerror="this.src='assets/images/placeholder.jpg'">
            <h3>${product.name}</h3>
            <p><strong>${product.price}</strong></p>
            <p><small>Category: ${product.category}</small></p>
            <p>${product.description}</p>
        `;
        grid.appendChild(article);
    });
    
    section.appendChild(grid);
    main.appendChild(section);
}

function loadNewsletterSection() {
    const main = document.querySelector('main');
    if (!main) return;
    
    const section = document.createElement('div');
    section.style.marginTop = '40px';
    
    const article = document.createElement('article');
    article.className = 'message';
    article.innerHTML = `
        <h2>Subscribe to Our Newsletter</h2>
        <p>Stay updated with our latest blog posts and product releases.</p>
        <form id="newsletterForm" style="margin-top: 24px;">
            <input type="email" id="newsletter-email" placeholder="Enter your email" required>
            <button type="submit">Subscribe</button>
        </form>
    `;
    
    section.appendChild(article);
    main.appendChild(section);
}

function initHomePage() {
    loadLatestBlog();
    loadFeaturedPosts();
    loadFeaturedProducts();
    loadNewsletterSection();
}

// Initialize home page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        initHomePage();
    }
});
