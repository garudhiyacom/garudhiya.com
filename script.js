/* -------------------------------------------------
   Header interactivity – hamburger open/close logic
   ------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navPanel   = document.querySelector('.site-nav');
    const navLinks   = document.querySelectorAll('.nav-list a');

    // Toggle the menu (adds/removes the .open class on both button and nav)
    if (menuToggle && navPanel) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navPanel.classList.toggle('open'); // toggle nav panel
            menuToggle.classList.toggle('open', isOpen);      // sync button animation
        });
    }

    // Close the menu when a navigation link is clicked (mobile only)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navPanel.classList.remove('open');
            menuToggle.classList.remove('open');
        });
    });

    // Optional: close when clicking outside the panel
    document.addEventListener('click', (e) => {
        const clickInside = navPanel.contains(e.target) || menuToggle.contains(e.target);
        if (!clickInside && navPanel.classList.contains('open')) {
            navPanel.classList.remove('open');
            menuToggle.classList.remove('open');
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navPanel.classList.contains('open')) {
            navPanel.classList.remove('open');
            menuToggle.classList.remove('open');
        }
    });
});
