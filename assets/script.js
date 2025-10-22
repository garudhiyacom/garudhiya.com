/* --------------------------------------------------------------
   0️⃣ Helper: check if element is in viewport
-------------------------------------------------------------- */
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

/* --------------------------------------------------------------
   1️⃣ DOMContentLoaded – set up navigation, dark mode, scroll anim
-------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Mobile navigation toggle ---------- */
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    }

    /* ---------- Dark‑mode toggle ---------- */
    // Insert button into the header (right after the logo)
    const header = document.querySelector('header .container');
    const darkBtn = document.createElement('button');
    darkBtn.className = 'theme-toggle';
    darkBtn.setAttribute('aria-label', 'Toggle dark mode');
    darkBtn.innerHTML = '🌙';                     // moon emoji – simple icon
    header.appendChild(darkBtn);

    // Load saved preference (if any)
    const saved = localStorage.getItem('garudhiya-theme');
    if (saved === 'dark') document.body.classList.add('dark-mode');

    darkBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('garudhiya-theme', isDark ? 'dark' : 'light');
        // Switch emoji for visual cue
        darkBtn.textContent = isDark ? '☀️' : '🌙';
    });

    /* ---------- Smooth scrolling for intra‑page anchors ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ---------- Contact form validation (unchanged) ---------- */
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            const name = contactForm.elements['name'].value.trim();
            const email = contactForm.elements['email'].value.trim();
            const message = contactForm.elements['message'].value.trim();
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            alert(`Thank you, ${name}! Your message has been received.`);
            contactForm.reset();
        });
    }

    /* ---------- Scroll‑into‑view animations ---------- */
    const animateEls = document.querySelectorAll('[data-animate]');
    const onScroll = () => {
        animateEls.forEach(el => {
            if (isInViewport(el)) el.classList.add('visible');
        });
    };
    // Run once on load + on scroll + on resize
    onScroll();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onScroll);
});
