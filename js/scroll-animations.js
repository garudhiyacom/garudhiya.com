// Scroll Animations
(function() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Initialize animations when DOM is ready
    function initScrollAnimations() {
        // Add fade-in class to elements that should animate
        const animateElements = document.querySelectorAll(
            '.featured-card, .product-card, .blog-card, .about, .featured, .page-header, .related-post-card'
        );
        
        animateElements.forEach((element, index) => {
            // Add staggered animation delay
            element.style.transitionDelay = `${index * 0.1}s`;
            element.classList.add('fade-in');
            observer.observe(element);
        });
    }
    
    // Run when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimations);
    } else {
        initScrollAnimations();
    }
})();
