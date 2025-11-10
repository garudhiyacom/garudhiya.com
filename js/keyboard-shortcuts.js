// Keyboard Shortcuts
(function() {
    document.addEventListener('keydown', function(e) {
        // Ignore if user is typing in an input field
        const activeElement = document.activeElement;
        const isInputField = activeElement.tagName === 'INPUT' || 
                            activeElement.tagName === 'TEXTAREA' || 
                            activeElement.isContentEditable;
        
        // "/" - Focus search
        if (e.key === '/' && !isInputField) {
            e.preventDefault();
            const searchInput = document.getElementById('global-search');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // "Escape" - Close search results or blur search
        if (e.key === 'Escape') {
            const searchResults = document.getElementById('search-results');
            const searchInput = document.getElementById('global-search');
            
            if (searchResults && searchResults.classList.contains('active')) {
                searchResults.classList.remove('active');
            }
            
            if (activeElement === searchInput) {
                searchInput.blur();
            }
        }
        
        // "Ctrl/Cmd + K" - Focus search (alternative)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('global-search');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Arrow keys for pagination (only if not in input field)
        if (!isInputField) {
            // Left arrow - Previous page
            if (e.key === 'ArrowLeft') {
                const prevButton = document.querySelector('.pagination-btn[onclick*="changePage"][onclick*="' + (window.currentPage - 1) + '"]') ||
                                  document.querySelector('.pagination-btn[onclick*="changeBlogPage"][onclick*="' + (window.currentBlogPage - 1) + '"]');
                if (prevButton && !prevButton.disabled) {
                    prevButton.click();
                }
            }
            
            // Right arrow - Next page
            if (e.key === 'ArrowRight') {
                const nextButton = document.querySelector('.pagination-btn[onclick*="changePage"][onclick*="' + (window.currentPage + 1) + '"]') ||
                                  document.querySelector('.pagination-btn[onclick*="changeBlogPage"][onclick*="' + (window.currentBlogPage + 1) + '"]');
                if (nextButton && !nextButton.disabled) {
                    nextButton.click();
                }
            }
        }
        
        // "Home" - Scroll to top
        if (e.key === 'Home' && !isInputField) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // "End" - Scroll to bottom
        if (e.key === 'End' && !isInputField) {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });
    
    // Show keyboard shortcuts hint on first visit
    function showKeyboardHint() {
        if (!localStorage.getItem('keyboard-hint-shown')) {
            setTimeout(function() {
                const hint = document.createElement('div');
                hint.className = 'keyboard-hint';
                hint.innerHTML = `
                    <div class="keyboard-hint-content">
                        <strong>💡 Tip:</strong> Press <kbd>/</kbd> to search
                        <button class="keyboard-hint-close" onclick="this.parentElement.parentElement.remove()">×</button>
                    </div>
                `;
                document.body.appendChild(hint);
                
                localStorage.setItem('keyboard-hint-shown', 'true');
                
                // Auto-hide after 5 seconds
                setTimeout(function() {
                    if (hint.parentElement) {
                        hint.classList.add('fade-out');
                        setTimeout(function() {
                            hint.remove();
                        }, 300);
                    }
                }, 5000);
            }, 2000);
        }
    }
    
    // Initialize hint
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showKeyboardHint);
    } else {
        showKeyboardHint();
    }
})();
