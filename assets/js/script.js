// ========================================
// FORM HANDLERS
// ========================================

// Contact form submission
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        
        alert(`Thank you ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
        this.reset();
    });
}

// Newsletter form submission
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value.trim();
        
        alert('Thank you for subscribing! You will receive our latest updates at: ' + email);
        this.reset();
    });
}

// Initialize all forms on page load
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initNewsletterForm();
});
