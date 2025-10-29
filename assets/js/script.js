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
});

// Blog page functionality
function initBlogPage() {
    const postsPerPage = 9;
    let currentPage = 1;
    
    function loadBlogPosts(page = 1) {
        const blogGrid = document.querySelector('.blog-grid');
        if (!blogGrid || typeof blogPosts === 'undefined') return;

        // Sort posts by date (newest first)
        const sortedPosts = [...blogPosts].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const postsToShow = sortedPosts.slice(startIndex, endIndex);

        blogGrid.innerHTML = '';

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
        const totalPages = Math.ceil(blogPosts.length / postsPerPage);
        const pagination = document.querySelector('.pagination');
        if (!pagination) return;

        pagination.innerHTML = '';

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
