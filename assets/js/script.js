'use strict';

// Utility function to escape HTML and prevent XS
function escapeHtml(unsafe) {
    const div = document.createElement('div');
    div.textContent = unsafe;
    return div.innerHTML;
}

// Utility function to sanitize HTML content
function sanitizeContent(html) {
    const allowedTags = ['p', 'h3', 'h4', 'strong', 'em', 'br', 'ul', 'ol', 'li'];
    const div = document.createElement('div');
    div.innerHTML = html;
    
    const walk = (node) => {
        if (node.nodeType === 3) return; // Text node
        if (node.nodeType === 1) { // Element node
            if (!allowedTags.includes(node.tagName.toLowerCase())) {
                node.replaceWith(...node.childNodes);
                return;
            }
            Array.from(node.childNodes).forEach(walk);
        }
    };
    
    Array.from(div.childNodes).forEach(walk);
    return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHamburgerMenu();
    initLazyImages();
    initFormHandlers();
});

// Navigation highlighting
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const target = link.getAttribute('href');
        const isHome = (target === '' || target === 'index.html');
        const matchesCurrent = target === currentPath;

        if ((isHome && (currentPath === '' || currentPath === 'index.html')) || matchesCurrent) {
            link.classList.add('active');
        }
    });
}

// Hamburger menu
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.site-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('show');
    };

    const closeMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('show');
    };

    // Click handler
    hamburger.addEventListener('click', toggleMenu);

    // Keyboard handler for accessibility
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('show')) {
            closeMenu();
        }
    });
}

// Toast notification system
function showToast(type, message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 4000);
}

// Lazy image loading with error handling
function initLazyImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                    });
                    
                    img.addEventListener('error', () => {
                        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="system-ui" font-size="16"%3EImage unavailable%3C/text%3E%3C/svg%3E';
                        img.classList.add('loaded');
                    });
                    
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
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

// Form handlers
function initFormHandlers() {
    initContactForm();
    initNewsletterForm();
}

// Contact form validation and submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear previous errors
        clearFormErrors(contactForm);

        const nameVal = contactForm.name?.value.trim() ?? '';
        const emailVal = contactForm.email?.value.trim() ?? '';
        const messageVal = contactForm.message?.value.trim() ?? '';

        let hasError = false;

        if (!nameVal) {
            showFieldError(contactForm.name, 'Please enter your name.');
            hasError = true;
        }

        if (!emailVal || !isValidEmail(emailVal)) {
            showFieldError(contactForm.email, 'Enter a valid email address.');
            hasError = true;
        }

        if (!messageVal) {
            showFieldError(contactForm.message, 'Message cannot be empty.');
            hasError = true;
        }

        if (hasError) return;

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('https://formspree.io/f/xanpgvko', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(contactForm)
            });

            if (response.ok) {
                showToast('success', '✓ Your message has been sent!');
                contactForm.reset();
            } else {
                showToast('error', '✗ Something went wrong. Please try again later.');
            }
        } catch (err) {
            console.error('Form submission error:', err);
            showToast('error', '✗ Unable to send. Check your connection.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Newsletter form validation and submission
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        clearFormErrors(newsletterForm);

        const emailVal = newsletterForm.email?.value.trim() ?? '';

        if (!emailVal || !isValidEmail(emailVal)) {
            showFieldError(newsletterForm.email, 'Please enter a valid email.');
            return;
        }

        // Show loading state
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('https://formspree.io/f/xanpgvko', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(newsletterForm)
            });

            if (response.ok) {
                showToast('success', '✓ Thanks for subscribing!');
                newsletterForm.reset();
            } else {
                showToast('error', '✗ Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error('Newsletter error:', err);
            showToast('error', '✗ Unable to subscribe. Check your connection.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(inputEl, msg) {
    const errorEl = inputEl?.parentElement?.querySelector('.error-msg');
    if (errorEl) {
        errorEl.textContent = msg;
        errorEl.style.display = 'block';
    }
}

function clearFormErrors(form) {
    form.querySelectorAll('.error-msg').forEach(el => {
        el.style.display = 'none';
    });
}

// Render blog posts (reusable function)
function renderBlogPosts(posts, container, options = {}) {
    const {
        limit = posts.length,
        cardClass = 'card blog-card'
    } = options;

    if (!container) return;

    container.innerHTML = '';
    
    const postsToRender = posts.slice(0, limit);

    if (postsToRender.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No posts found.</p>';
        return;
    }

    postsToRender.forEach(post => {
        const article = document.createElement('article');
        article.className = cardClass;

        const img = document.createElement('img');
        img.dataset.src = post.img;
        img.alt = `Featured image for ${escapeHtml(post.title)}`;
        img.className = 'blog-image';
        article.appendChild(img);

        const content = document.createElement('div');
        content.className = 'blog-content';

        const meta = document.createElement('p');
        meta.className = 'blog-meta';
        meta.textContent = `${escapeHtml(post.author)} • ${new Date(post.date).toLocaleDateString()}`;
        content.appendChild(meta);

        const title = document.createElement('h3');
        title.className = 'blog-title';
        title.textContent = post.title;
        content.appendChild(title);

        const excerpt = document.createElement('p');
        excerpt.className = 'blog-excerpt';
        excerpt.textContent = post.excerpt;
        content.appendChild(excerpt);

        const readMore = document.createElement('a');
        readMore.className = 'read-more';
        readMore.href = `blog-detail.html?id=${post.id}`;
        readMore.textContent = 'Read More →';
        content.appendChild(readMore);

        article.appendChild(content);
        container.appendChild(article);
    });

    initLazyImages();
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
