// Toast Notification System
(function() {
    let toastContainer = null;
    
    function createToastContainer() {
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        return toastContainer;
    }
    
    function showToast(message, type = 'info', duration = 4000) {
        const container = createToastContainer();
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            info: 'ℹ'
        };
        
        const titles = {
            success: 'Success',
            error: 'Error',
            info: 'Info'
        };
        
        toast.innerHTML = `
            <div class="toast-icon">${icons[type]}</div>
            <div class="toast-content">
                <div class="toast-title">${titles[type]}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" aria-label="Close">×</button>
        `;
        
        container.appendChild(toast);
        
        // Close button
        toast.querySelector('.toast-close').addEventListener('click', function() {
            removeToast(toast);
        });
        
        // Auto-dismiss
        if (duration > 0) {
            setTimeout(function() {
                removeToast(toast);
            }, duration);
        }
        
        return toast;
    }
    
    function removeToast(toast) {
        toast.classList.add('toast-exit');
        setTimeout(function() {
            if (toast.parentElement) {
                toast.remove();
            }
            // Remove container if empty
            if (toastContainer && toastContainer.children.length === 0) {
                toastContainer.remove();
                toastContainer = null;
            }
        }, 300);
    }
    
    // Expose global toast function
    window.showToast = showToast;
})();
