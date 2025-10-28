function loadBlogCards() {
    const main = document.querySelector('main');
    
    if (posts && posts.length > 0) {
        posts.forEach(post => {
            const article = document.createElement('article');
            article.innerHTML = `
                <h2>${post.title}</h2>
                <img src="${post.img}" alt="${post.title}" onerror="this.src='assets/images/placeholder.jpg'">
                <p>${post.excerpt}</p>
                <p>By ${post.author} on ${post.date}</p>
                <a href="blog-details.html?id=${post.id}">Read More</a>
            `;
            main.appendChild(article);
        });
    } else {
        main.innerHTML = '<article><h2>No blog posts available</h2><p>Check back soon for new content!</p></article>';
    }
}

function loadBlogDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));
    
    if (!postId) {
        displayError('No blog post ID provided');
        return;
    }
    
    const post = posts.find(p => p.id === postId);
    
    if (post) {
        const main = document.querySelector('main');
        main.innerHTML = `
            <article>
                <h2>${post.title}</h2>
                <img src="${post.img}" alt="${post.title}" onerror="this.src='assets/images/placeholder.jpg'">
                <p>By ${post.author} on ${post.date}</p>
                <div style="white-space: pre-line;">${post.content}</div>
                <a href="blog.html" style="margin-top: 20px;">← Back to Blog</a>
            </article>
        `;
        document.title = `Garudhiya - ${post.title}`;
    } else {
        displayError('Blog post not found');
    }
}

function displayError(message) {
    const main = document.querySelector('main');
    main.innerHTML = `
        <article>
            <h2>Error</h2>
            <p>${message}</p>
            <a href="blog.html">← Back to Blog</a>
        </article>
    `;
}

if (window.location.pathname.includes('blog.html')) {
    window.addEventListener('DOMContentLoaded', loadBlogCards);
}

if (window.location.pathname.includes('blog-details.html')) {
    window.addEventListener('DOMContentLoaded', loadBlogDetails);
}
