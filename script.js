// Simple toggle for the mobile navigation menu
document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('menu-toggle');
    const navList   = document.getElementById('nav-list');

    toggleBtn.addEventListener('click', function () {
        navList.classList.toggle('show');
    });
});
