'use strict';

document.addEventListener('DOMContentLoaded', () => {
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
    if (!toast) return;
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async e => {
        e.preventDefault();

        document.querySelectorAll('.error-msg')
                .forEach(el => el.style.display = 'none');

        const nameVal    = contactForm.name?.value.trim() ?? '';
        const emailVal   = contactForm.email?.value.trim() ?? '';
        const messageVal = contactForm.message?.value.trim() ?? '';

        let hasError = false;

        if (!nameVal) {
            showFieldError(contactForm.name, 'Please enter your name.');
            hasError = true;
        }
        if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
            showFieldError(contactForm.email, 'Enter a valid e‑mail address.');
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

function showFieldError(inputEl, msg) {
    const errorEl = inputEl?.parentElement?.querySelector('.error-msg');
    if (errorEl) {
        errorEl.textContent = msg;
        errorEl.style.display = 'block';
    }
}
