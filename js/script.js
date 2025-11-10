// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(function() {
            loadingScreen.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(function() {
                loadingScreen.remove();
            }, 500);
        }, 300);
    }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = '<div class="loader"></div>';
    document.body.prepend(loadingScreen);
    
    // Back to Top Button
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    backToTopButton.innerHTML = `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    `;
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const headerSearch = document.querySelector('.header-search');

    // Add mobile search to menu on mobile devices
    function setupMobileMenu() {
        if (window.innerWidth <= 768 && headerSearch && navLinks) {
            // Check if mobile search already exists
            let mobileSearch = navLinks.querySelector('.mobile-search');
            if (!mobileSearch) {
                // Create mobile search wrapper
                mobileSearch = document.createElement('div');
                mobileSearch.className = 'mobile-search';
                
                // Create search input
                const searchInput = document.createElement('input');
                searchInput.type = 'text';
                searchInput.id = 'mobile-global-search';
                searchInput.placeholder = 'Search products & blog...';
                
                // Create search results container
                const searchResults = document.createElement('div');
                searchResults.id = 'mobile-search-results';
                searchResults.className = 'search-results';
                
                mobileSearch.appendChild(searchInput);
                mobileSearch.appendChild(searchResults);
                
                // Insert at the beginning of nav-links
                navLinks.insertBefore(mobileSearch, navLinks.firstChild);
                
                // Initialize search for mobile input
                if (typeof initializeSearch === 'function') {
                    initializeSearch('mobile-global-search', 'mobile-search-results');
                }
            }
        } else {
            // Remove mobile search on desktop
            const mobileSearch = navLinks.querySelector('.mobile-search');
            if (mobileSearch) {
                mobileSearch.remove();
            }
        }
    }

    // Setup on load with delay to ensure DOM is ready
    setTimeout(setupMobileMenu, 100);

    // Setup on resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setupMobileMenu, 250);
    });

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger menu
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
        }
    });

    // Contact Form Handler with Formspree
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formMessage = document.getElementById('form-message');
            const submitButton = this.querySelector('button[type="submit"]');
            
            // Disable submit button
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            try {
                // Submit to Formspree
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    if (typeof showToast === 'function') {
                        showToast('Your message has been sent successfully!', 'success');
                    }
                    formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                    formMessage.className = 'form-message success';
                    formMessage.style.display = 'block';
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                if (typeof showToast === 'function') {
                    showToast('There was a problem sending your message. Please try again.', 'error');
                }
                formMessage.textContent = 'Oops! There was a problem sending your message. Please try again.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            }
            
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
            
            // Hide message after 5 seconds
            setTimeout(function() {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }

    // Newsletter Form Handler
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const newsletterMessage = document.getElementById('newsletter-message');
            const submitButton = this.querySelector('button[type="submit"]');
            const emailInput = this.querySelector('input[type="email"]');
            
            // Disable submit button
            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';
            
            try {
                // Submit to Formspree
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    if (typeof showToast === 'function') {
                        showToast('Thank you for subscribing to our newsletter!', 'success');
                    }
                    newsletterMessage.textContent = '✓ Thank you for subscribing!';
                    newsletterMessage.className = 'newsletter-message success';
                    newsletterMessage.style.display = 'block';
                    
                    // Reset form
                    emailInput.value = '';
                } else {
                    throw new Error('Subscription failed');
                }
            } catch (error) {
                if (typeof showToast === 'function') {
                    showToast('Something went wrong. Please try again.', 'error');
                }
                newsletterMessage.textContent = 'Oops! Something went wrong. Please try again.';
                newsletterMessage.className = 'newsletter-message error';
                newsletterMessage.style.display = 'block';
            }
            
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = 'Subscribe';
            
            // Hide message after 5 seconds
            setTimeout(function() {
                newsletterMessage.style.display = 'none';
            }, 5000);
        });
    }
});
