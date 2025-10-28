// ========================================
// UTILITY FUNCTIONS
// ========================================

// Create HTML element with attributes
function createElement(tag, attributes = {}, innerHTML = '') {
    const element = document.createElement(tag);
    Object.keys(attributes).forEach(key => {
        if (key === 'style') {
            element.style.cssText = attributes[key];
        } else {
            element.setAttribute(key, attributes[key]);
        }
    });
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
}

// Shuffle array randomly
function shuffleArray(array) {
    return [...array].sort(() => 0.5 - Math.random());
}

// Get random items from array
function getRandomItems(array, count) {
    return shuffleArray(array).slice(0, count);
}

// Safe querySelector with error handling
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// ========================================
// IMAGE HANDLING
// ========================================

// Add fallback for broken images
function addImageFallback(imgElement, fallbackSrc = 'assets/images/placeholder.jpg') {
    imgElement.onerror = function() {
        this.onerror = null; // Prevent infinite loop
        this.src = fallbackSrc;
    };
}

// ========================================
// FORM HANDLERS
// ========================================

// Contact form submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        alert(`Thank you ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
        this.reset();
    });
}

// Newsletter form submission
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('newsletter-email').value.trim();
        
        if (!email) {
            alert('Please enter a valid email address.');
            return;
        }
        
        alert('Thank you for subscribing! You will receive our latest updates at: ' + email);
        this.reset();
    });
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

// Initialize search functionality
function initSearch() {
    const searchInput = document.querySelector('nav input[type="search"]');
    if (!searchInput) return;
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                alert(`Search functionality coming soon! You searched for: ${query}`);
            }
        }
    });
}

// ========================================
// INITIALIZATION
// ========================================

// Initialize all interactive elements
function init() {
    initContactForm();
    initNewsletterForm();
    initSearch();
}

// Run on page load
document.addEventListener('DOMContentLoaded', init);
