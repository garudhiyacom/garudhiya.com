document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop();
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

    const hamburger = document.querySelector('.hamburger');
    const navMenu   = document.querySelector('.site-nav');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });

        navLinks.forEach(l => {
            l.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });
    }
});
function showToast(type, message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');

    setTimeout(() => toast.classList.add('hidden'), 3000);
}
document.getElementById('contactForm').addEventListener('submit', async e => {
    e.preventDefault();
    
    const errors = document.querySelectorAll('.error-msg');
    errors.forEach(el => el.style.display = 'none');

    const name    = e.target.name.value.trim();
    const email   = e.target.email.value.trim();
    const message = e.target.message.value.trim();

    let hasError = false;

    if (!name)    { e.target.name.parentElement.querySelector('.error-msg').style.display = 'block'; hasError = true; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        e.target.email.parentElement.querySelector('.error-msg').style.display = 'block';
        hasError = true;
    }
    if (!message) { e.target.message.parentElement.querySelector('.error-msg').style.display = 'block'; hasError = true; }

    if (hasError) return;

    const response = await fetch('https://formspree.io/f/xanpgvko', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(e.target)
    });
    if (response.ok) {
        showToast('success', '✅ Your message has been sent!');
        e.target.reset();
    } else {
        showToast('error', '❌ Something went wrong – try again later.');
    }

    showToast('success', '✅ Demo: message accepted (no network call).');
    e.target.reset();
});
