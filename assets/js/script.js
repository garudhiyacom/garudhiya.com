/* ============================================================
   Garudhiya – UI helpers
   ------------------------------------------------------------
   • Highlights the active navigation link
   • Toggles the mobile (hamburger) menu
   • Shows toast notifications
   • Validates & submits the contact form (Formspree)
   ============================================================ */
'use strict';

/* ------------------------------------------------------------
   1️⃣  NAVIGATION – active link & hamburger toggle
   ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop(); // e.g. "products.html"

    // ---- Highlight the link that matches the current page ----
    navLinks.forEach(link => {
        const target = link.getAttribute('href');

        const isHome = (target === '' || target === 'index.html');
        const matchesCurrent = target === currentPath;

        if ((isHome && (currentPath === '' || currentPath === 'index.html')) ||
            matchesCurrent) {
            link.classList.add('active');
        }
    });

    // ---- Mobile hamburger menu -------------------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const navMenu   = document.querySelector('.site-nav');

    if (hamburger && navMenu) {
        // Open / close the menu
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });

        // When a link is clicked, hide the menu again (good UX on mobile)
        navLinks.forEach(l => {
            l.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });
    }
});

/* ------------------------------------------------------------
   2️⃣  TOAST NOTIFICATIONS
   ------------------------------------------------------------ */
function showToast(type, message) {
    const toast = document.getElementById('toast');
    if (!toast) return; // safety net – nothing to show

    toast.textContent = message;
    toast.className = `toast ${type}`; // sets both the base class and success/error
    toast.classList.remove('hidden');

    // Auto‑hide after 3 seconds
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

/* ------------------------------------------------------------
   3️⃣  CONTACT FORM – validation + Formspree submit
   ------------------------------------------------------------ */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async e => {
        e.preventDefault();

        // ---- Reset any previous error messages ----
        document.querySelectorAll('.error-msg')
                .forEach(el => el.style.display = 'none');

        // ---- Grab values (trimmed) ----
        const nameVal    = contactForm.name?.value.trim() ?? '';
        const emailVal   = contactForm.email?.value.trim() ?? '';
        const messageVal = contactForm.message?.value.trim() ?? '';

        let hasError = false;

        // ---- Simple client‑side validation ----
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

        if (hasError) return; // stop submission

        // ---- Send to Formspree (or any endpoint you prefer) ----
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
            // Network‑level failure (offline, CORS, etc.)
            console.error('Form submission error:', err);
            showToast('error', '❌ Unable to send – check your connection.');
        }
    });
}

/**
 * Helper – show the inline error message for a given input element.
 * The markup expects a sibling element with class `.error-msg`.
 */
function showFieldError(inputEl, msg) {
    const errorEl = inputEl?.parentElement?.querySelector('.error-msg');
    if (errorEl) {
        errorEl.textContent = msg;
        errorEl.style.display = 'block';
    }
}
