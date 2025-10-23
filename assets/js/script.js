// Highlight the active navigation link based on the current page URL
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop(); // e.g., "products.html"
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkTarget = link.getAttribute('href');
        if (
            (linkTarget === '' && (currentPath === '' || currentPath === 'index.html')) ||
            linkTarget === currentPath
        ) {
            link.classList.add('active');
        }
    });

    // ----- Mobile hamburger menu -----
    const hamburger = document.querySelector('.hamburger');
    const navMenu   = document.querySelector('.site-nav');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });

        // Close the menu when a link is clicked (nice UX on mobile)
        navLinks.forEach(l => {
            l.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });
    }
});
