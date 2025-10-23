// Highlight the active navigation link based on the current page URL
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop(); // e.g., "products.html"
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkTarget = link.getAttribute('href');
        // If linkTarget matches the filename (or empty for index.html) mark it active
        if (
            (linkTarget === '' && (currentPath === '' || currentPath === 'index.html')) ||
            linkTarget === currentPath
        ) {
            link.classList.add('active');
        }
    });
});
