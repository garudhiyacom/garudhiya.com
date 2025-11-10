// Confirmation Dialog System
(function() {
    let dialogOverlay = null;
    let resolveCallback = null;
    
    function createDialog() {
        if (!dialogOverlay) {
            dialogOverlay = document.createElement('div');
            dialogOverlay.className = 'confirm-dialog-overlay';
            dialogOverlay.innerHTML = `
                <div class="confirm-dialog">
                    <h3 class="confirm-dialog-title"></h3>
                    <p class="confirm-dialog-message"></p>
                    <div class="confirm-dialog-buttons">
                        <button class="confirm-dialog-btn cancel">Cancel</button>
                        <button class="confirm-dialog-btn confirm">Confirm</button>
                    </div>
                </div>
            `;
            document.body.appendChild(dialogOverlay);
            
            // Close on overlay click
            dialogOverlay.addEventListener('click', function(e) {
                if (e.target === dialogOverlay) {
                    closeDialog(false);
                }
            });
            
            // Cancel button
            dialogOverlay.querySelector('.cancel').addEventListener('click', function() {
                closeDialog(false);
            });
            
            // Confirm button
            dialogOverlay.querySelector('.confirm').addEventListener('click', function() {
                closeDialog(true);
            });
            
            // ESC key to cancel
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && dialogOverlay.classList.contains('active')) {
                    closeDialog(false);
                }
            });
        }
        return dialogOverlay;
    }
    
    function showConfirm(title, message, confirmText = 'Confirm', cancelText = 'Cancel') {
        return new Promise(function(resolve) {
            const dialog = createDialog();
            resolveCallback = resolve;
            
            dialog.querySelector('.confirm-dialog-title').textContent = title;
            dialog.querySelector('.confirm-dialog-message').textContent = message;
            dialog.querySelector('.confirm').textContent = confirmText;
            dialog.querySelector('.cancel').textContent = cancelText;
            
            dialog.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus confirm button
            setTimeout(function() {
                dialog.querySelector('.confirm').focus();
            }, 100);
        });
    }
    
    function closeDialog(confirmed) {
        if (dialogOverlay) {
            dialogOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            if (resolveCallback) {
                resolveCallback(confirmed);
                resolveCallback = null;
            }
        }
    }
    
    // Expose global confirm function
    window.showConfirm = showConfirm;
})();
