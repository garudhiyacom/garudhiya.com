function loadBlogCards() {
    const main = document.querySelector('main');
    
    posts.forEach(post => {
        const article = document.createElement('article');
        article.innerHTML = `
            <h2>${post.title}</h2>
            <img src="${post.img}" alt="${post.title}">
            <p>${post.excerpt}</p>
            <p>By ${post.author} on ${post.date}</p>
            <a href="blog-details.html?id=${post.id}">Read More</a>
        `;
        main.appendChild(article);
    });
}

function loadBlogDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));
    
    const post = posts.find(p => p.id === postId);
    
    if (post) {
        const main = document.querySelector('main');
        main.innerHTML = `
            <article>
                <h2>${post.title}</h2>
                <img src="${post.img}" alt="${post.title}">
                <p>By ${post.author} on ${post.date}</p>
                <p>${post.content}</p>
            </article>
        `;
    }
}

if (window.location.pathname.includes('blog.html')) {
    loadBlogCards();
}

if (window.location.pathname.includes('blog-details.html')) {
    loadBlogDetails();
}
