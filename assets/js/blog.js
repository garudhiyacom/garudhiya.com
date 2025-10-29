// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Getting Started with Garudhiya",
        date: "October 25, 2025",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "https://via.placeholder.com/400x250",
        link: "#"
    },
    {
        id: 2,
        title: "5 Tips for Better Results",
        date: "October 20, 2025",
        excerpt: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "https://via.placeholder.com/400x250",
        link: "#"
    },
    {
        id: 3,
        title: "Understanding Our Products",
        date: "October 15, 2025",
        excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        image: "https://via.placeholder.com/400x250",
        link: "#"
    },
    {
        id: 4,
        title: "Customer Success Stories",
        date: "October 10, 2025",
        excerpt: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "https://via.placeholder.com/400x250",
        link: "#"
    },
    {
        id: 5,
        title: "Behind the Scenes at Garudhiya",
        date: "October 5, 2025",
        excerpt: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        image: "https://via.placeholder.com/400x250",
        link: "#"
    },
    {
        id: 6,
        title: "What's New This Month",
        date: "September 30, 2025",
        excerpt: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
        image: "https://via.placeholder.com/400x250",
        link: "#"
    },
    {
        id: 7,
        title: "Industry Trends to Watch",
        date: "September 25, 2025",
        excerpt: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
        image: "https://via.placeholder.com/400x250",
        link: "#"
    },
    {
        id: 8,
        title: "How to Maximize Your Experience",
        date: "September 20, 2025",
        excerpt: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
        image: "https://via.placeholder.com/400x250",
        link: "#"
    },
    {
        id: 9,
        title: "Meet Our Team",
        date: "September 15, 2025",
        excerpt: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.",
        image: "https://via.placeholder.com/400x250",
        link: "#"
    }
];

// Pagination settings
const postsPerPage = 6;
let currentPage = 1;

// Load blog posts
function loadBlogPosts(page = 1) {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;

    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = blogPosts.slice(startIndex, endIndex);

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
                    <a href="${post.link}" class="read-more">Read More →</a>
                </div>
            </article>
        `;
        blogGrid.innerHTML += postHTML;
    });

    updatePagination(page);
}

// Update pagination
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadBlogPosts(currentPage);
});
