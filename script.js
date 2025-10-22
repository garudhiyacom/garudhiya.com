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
