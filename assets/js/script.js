'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Active nav link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const target = link.getAttribute('href');
        const isHome = (target === '' || target === 'index.html');
        const matchesCurrent = target === currentPath;

        if ((isHome && (currentPath === '' || currentPath === 'index.html')) ||
            matchesCurrent) {
            link.classList.add('active');
        }
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.site-nav');

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

    // Initialize lazy loading
    initLazyImages();
});

// Toast notification system
function showToast(type, message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

// Lazy image loading implementation
function initLazyImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
        });
    }
}

// Contact form validation and submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async e => {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.error-msg')
                .forEach(el => el.style.display = 'none');

        const nameVal = contactForm.name?.value.trim() ?? '';
        const emailVal = contactForm.email?.value.trim() ?? '';
        const messageVal = contactForm.message?.value.trim() ?? '';

        let hasError = false;

        if (!nameVal) {
            showFieldError(contactForm.name, 'Please enter your name.');
            hasError = true;
        }
        if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
            showFieldError(contactForm.email, 'Enter a valid e-mail address.');
            hasError = true;
        }
        if (!messageVal) {
            showFieldError(contactForm.message, 'Message cannot be empty.');
            hasError = true;
        }

        if (hasError) return;

        try {
            const response = await fetch('https://formspree.io/f/xanpgvko', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(contactForm)
            });

            if (response.ok) {
                showToast('success', '✅ Your message has been sent!');
                contactForm.reset();
            } else {
                showToast('error', '❌ Something went wrong – please try again later.');
            }
        } catch (err) {
            console.error('Form submission error:', err);
            showToast('error', '❌ Unable to send – check your connection.');
        }
    });
}

// Newsletter form validation and submission
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async e => {
        e.preventDefault();

        document.querySelectorAll('.error-msg')
                .forEach(el => el.style.display = 'none');

        const emailVal = newsletterForm.email?.value.trim() ?? '';

        if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
            showFieldError(newsletterForm.email, 'Please enter a valid e-mail.');
            return;
        }

        try {
            const response = await fetch('https://formspree.io/f/xanpgvko', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(newsletterForm)
            });

            if (response.ok) {
                showToast('success', '✅ Thanks for subscribing!');
                newsletterForm.reset();
            } else {
                showToast('error', '❌ Something went wrong – please try again.');
            }
        } catch (err) {
            console.error('Newsletter error:', err);
            showToast('error', '❌ Unable to subscribe – check your connection.');
        }
    });
}

function showFieldError(inputEl, msg) {
    const errorEl = inputEl?.parentElement?.querySelector('.error-msg');
    if (errorEl) {
        errorEl.textContent = msg;
        errorEl.style.display = 'block';
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
