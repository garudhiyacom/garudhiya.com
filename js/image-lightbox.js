// Image Lightbox
(function() {
    let lightbox = null;
    
    function createLightbox() {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">×</button>
                <img src="" alt="">
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Close on click outside image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Close button
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
    
    function openLightbox(imageSrc, imageAlt) {
        if (!lightbox) {
            createLightbox();
        }
        
        const img = lightbox.querySelector('img');
        const caption = lightbox.querySelector('.lightbox-caption');
        
        img.src = imageSrc;
        img.alt = imageAlt || '';
        
        if (imageAlt) {
            caption.textContent = imageAlt;
            caption.style.display = 'block';
        } else {
            caption.style.display = 'none';
        }
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Initialize lightbox for blog post images
    function initImageLightbox() {
        // Wait a bit for images to load
        setTimeout(function() {
            const images = document.querySelectorAll('.blog-post-content img, .blog-post-emoji img');
            
            images.forEach(function(img) {
                img.addEventListener('click', function() {
                    openLightbox(this.src, this.alt);
                });
            });
        }, 500);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initImageLightbox);
    } else {
        initImageLightbox();
    }
})();
