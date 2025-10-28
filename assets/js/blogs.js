const posts = [
    {
        id: 1,
        title: "Sample Blog Post",
        excerpt: "This is a short excerpt of the blog post",
        img: "assets/images/post1.jpg",
        date: "2025-10-28",
        author: "John Doe",
        content: "This is the full content of the blog post. It can contain multiple paragraphs and detailed information about the topic."
    }
];

function loadPosts() {
    const main = document.querySelector('main');
    
    posts.forEach(post => {
        const article = document.createElement('article');
        article.innerHTML = `
            <h2>${post.title}</h2>
            <img src="${post.img}" alt="${post.title}">
            <p>${post.excerpt}</p>
            <p>By ${post.author} on ${post.date}</p>
            <p>${post.content}</p>
        `;
        main.appendChild(article);
    });
}

if (window.location.pathname.includes('blog.html')) {
    loadPosts();
}
