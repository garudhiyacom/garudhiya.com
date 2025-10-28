function loadSinglePost() {
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

if (window.location.search.includes('id=')) {
    loadSinglePost();
}
