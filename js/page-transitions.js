// Smooth Page Transitions
(function() {
    let transitionOverlay = null;
    
    function createTransitionOverlay() {
        if (!transitionOverlay) {
            transitionOverlay = document.createElement('div');
            transitionOverlay.className = 'page-transition-overlay';
            transitionOverlay.innerHTML = '<div class="page-transition-spinner"></div>';
            document.body.appendChild(transitionOverlay);
        }
        return transitionOverlay;
    }
    
    function showTransition() {
        const overlay = createTransitionOverlay();
        overlay.classList.add('active');
    }
    
    function hideTransition() {
        if (transitionOverlay) {
            transitionOverlay.classList.remove('active');
        }
    }
    
    // Scroll to top and fade in page on load
    window.addEventListener('load', function() {
        // Scroll to top
        window.scrollTo(0, 0);
        
        document.body.classList.remove('page-transition');
        hideTransition();
    });
    
    // Add transition to all internal links
    document.addEventListener('DOMContentLoaded', function() {
        // Ensure page starts at top
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
        
        // Fade in current page
        setTimeout(function() {
            document.body.classList.remove('page-transition');
        }, 50);
        
        // Intercept clicks on internal links
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            
            // Check if it's an internal link
            if (link && 
                link.href && 
                link.hostname === window.location.hostname &&
                !link.hasAttribute('target') &&
                !link.hasAttribute('download') &&
                !link.hash &&
                link.href !== window.location.href) {
                
                // Ignore if it's a special link (like recent searches)
                if (link.getAttribute('href') === '#') {
                    return;
                }
                
                e.preventDefault();
                
                // Show transition
                showTransition();
                document.body.classList.add('page-transition');
                
                // Navigate after animation
                setTimeout(function() {
                    window.location.href = link.href;
                }, 300);
            }
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            // Page was loaded from cache (back/forward button)
            document.body.classList.remove('page-transition');
            hideTransition();
        }
    });
})();
