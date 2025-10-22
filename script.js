/* Hamburger toggle – self‑executing to avoid globals */
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const burger = document.getElementById('burger');
        const mobileMenu = document.getElementById('mobileMenu');

        // Guard against missing elements (helps during development)
        if (!burger || !mobileMenu) return;

        burger.addEventListener('click', () => {
            const expanded = burger.getAttribute('aria-expanded') === 'true';
            burger.setAttribute('aria-expanded', !expanded);
            mobileMenu.classList.toggle('show');
        });
    });
})();

<script>
// Run after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the path part of the URL (e.g., "/products.html")
    const currentPath = window.location.pathname.split('/').pop();

    // Helper: mark a link as active if its href ends with the same filename
    const markActive = (selector) => {
        document.querySelectorAll(selector).forEach(link => {
            // Extract just the filename from the href (ignore query strings)
            const linkPath = link.getAttribute('href').split('?')[0];
            if (linkPath === currentPath) {
                link.classList.add('active');
            }
        });
    };

    // Apply to both desktop and mobile navigation links
    markActive('header nav a');          // desktop nav
    markActive('.mobile-menu a');       // mobile dropdown
});
</script>
