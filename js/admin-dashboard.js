// Admin Dashboard Management System
// Uses localStorage to persist data

// Initialize data storage
function initStorage() {
    if (!localStorage.getItem('products')) {
        // Load default products with placeholder images
        const defaultProducts = [
            { id: 1, name: 'Premium Headphones', description: 'High-quality wireless headphones with noise cancellation.', price: '$129.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%234f46e5" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EHeadphones%3C/text%3E%3C/svg%3E' },
            { id: 2, name: 'Smart Watch', description: 'Track your fitness and stay connected on the go.', price: '$199.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2310b981" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3ESmart Watch%3C/text%3E%3C/svg%3E' },
            { id: 3, name: 'Laptop Stand', description: 'Ergonomic aluminum stand for better posture.', price: '$49.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f59e0b" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3ELaptop Stand%3C/text%3E%3C/svg%3E' },
            { id: 4, name: 'Wireless Mouse', description: 'Precision wireless mouse with long battery life.', price: '$34.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ec4899" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EWireless Mouse%3C/text%3E%3C/svg%3E' },
            { id: 5, name: 'USB-C Hub', description: 'Multi-port hub for all your connectivity needs.', price: '$44.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%238b5cf6" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EUSB-C Hub%3C/text%3E%3C/svg%3E' },
            { id: 6, name: 'Desk Lamp', description: 'LED desk lamp with adjustable brightness and color.', price: '$54.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2306b6d4" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EDesk Lamp%3C/text%3E%3C/svg%3E' },
            { id: 7, name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard with tactile switches.', price: '$89.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ef4444" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EKeyboard%3C/text%3E%3C/svg%3E' },
            { id: 8, name: 'Webcam HD', description: 'Crystal clear 1080p webcam for video calls.', price: '$69.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2314b8a6" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EWebcam%3C/text%3E%3C/svg%3E' },
            { id: 9, name: 'Phone Holder', description: 'Adjustable phone holder for desk or car.', price: '$19.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f97316" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EPhone Holder%3C/text%3E%3C/svg%3E' },
            { id: 10, name: 'Portable Charger', description: '20000mAh power bank for all your devices.', price: '$39.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%236366f1" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EPower Bank%3C/text%3E%3C/svg%3E' },
            { id: 11, name: 'Bluetooth Speaker', description: 'Portable speaker with amazing sound quality.', price: '$79.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23a855f7" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3ESpeaker%3C/text%3E%3C/svg%3E' },
            { id: 12, name: 'Cable Organizer', description: 'Keep your cables neat and organized.', price: '$14.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2322c55e" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EOrganizer%3C/text%3E%3C/svg%3E' },
            { id: 13, name: 'Monitor Riser', description: 'Wooden monitor stand with storage space.', price: '$59.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23eab308" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EMonitor Riser%3C/text%3E%3C/svg%3E' },
            { id: 14, name: 'Laptop Sleeve', description: 'Protective sleeve for 13-15 inch laptops.', price: '$24.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f43f5e" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3ELaptop Sleeve%3C/text%3E%3C/svg%3E' },
            { id: 15, name: 'Screen Cleaner Kit', description: 'Professional cleaning kit for all screens.', price: '$12.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2306b6d4" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3ECleaner Kit%3C/text%3E%3C/svg%3E' },
            { id: 16, name: 'Ergonomic Chair Cushion', description: 'Memory foam cushion for better comfort.', price: '$34.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ec4899" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3ECushion%3C/text%3E%3C/svg%3E' },
            { id: 17, name: 'Desk Mat', description: 'Large desk mat with smooth surface.', price: '$29.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%234f46e5" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EDesk Mat%3C/text%3E%3C/svg%3E' },
            { id: 18, name: 'Wrist Rest', description: 'Gel wrist rest for keyboard and mouse.', price: '$18.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2310b981" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EWrist Rest%3C/text%3E%3C/svg%3E' }
        ];
        localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
    
    if (!localStorage.getItem('blogPosts')) {
        // Load default blog posts
        const defaultPosts = [
            { 
                id: 1, 
                title: 'Getting Started with Garudhiya', 
                excerpt: 'Learn about our journey and what makes Garudhiya special.', 
                content: 'Welcome to Garudhiya! This is our first blog post.\n\nWe\'re excited to share our journey with you. Garudhiya represents more than just a brand - it\'s a commitment to quality, innovation, and meaningful connections.\n\nIn this blog, we\'ll share insights, updates, and stories that matter. Stay tuned for more!',
                date: 'November 9, 2025',
                image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%236366f1" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3EGetting Started%3C/text%3E%3C/svg%3E'
            },
            { 
                id: 2, 
                title: 'Building Quality Products', 
                excerpt: 'Our approach to creating products that matter.', 
                content: 'Quality over quantity - that\'s our motto.\n\nEvery product we create goes through rigorous testing and refinement. We believe in creating things that last, that serve a real purpose, and that make people\'s lives better.\n\nOur process involves careful research, thoughtful design, and continuous improvement based on feedback.',
                date: 'November 8, 2025',
                image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%2314b8a6" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3EQuality Products%3C/text%3E%3C/svg%3E'
            },
            { 
                id: 3, 
                title: 'The Power of Personal Branding', 
                excerpt: 'Why personal branding matters in today\'s digital world.', 
                content: 'In today\'s connected world, your personal brand is your reputation.\n\nIt\'s how people perceive you, what they associate with your name, and the value you bring to the table. Building a strong personal brand takes time, consistency, and authenticity.\n\nBe genuine, be consistent, and always deliver value. That\'s the foundation of a strong personal brand.',
                date: 'November 7, 2025',
                image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%23f59e0b" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3EPersonal Branding%3C/text%3E%3C/svg%3E'
            }
        ];
        localStorage.setItem('blogPosts', JSON.stringify(defaultPosts));
    }
}

// Get data from storage
function getProducts() {
    return JSON.parse(localStorage.getItem('products') || '[]');
}

function getBlogPosts() {
    return JSON.parse(localStorage.getItem('blogPosts') || '[]');
}

// Save data to storage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

function saveBlogPosts(posts) {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
}

// Generate unique ID
function generateId(items) {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
}

// Products Management
function renderProducts() {
    const products = getProducts();
    const container = document.getElementById('products-list');
    
    if (products.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No products yet. Click "Add Product" to create one.</p></div>';
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="admin-item ${product.hidden ? 'hidden-item' : ''}" data-id="${product.id}">
            <div class="admin-item-content">
                <h3>
                    ${product.emoji} ${product.name}
                    ${product.hidden ? '<span class="hidden-badge">Hidden</span>' : ''}
                </h3>
                <p>${product.description}</p>
                <div class="admin-item-meta">
                    <span><strong>Price:</strong> ${product.price}</span>
                </div>
            </div>
            <div class="admin-item-actions">
                <button class="btn-toggle" onclick="toggleProductVisibility(${product.id})">
                    ${product.hidden ? '👁️ Show' : '🙈 Hide'}
                </button>
                <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function editProduct(id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);
    
    if (product) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-price').value = product.price;
        
        // Show existing image if available
        const preview = document.getElementById('product-image-preview');
        if (product.image) {
            preview.innerHTML = `
                <img src="${product.image}" alt="Current image">
                <div class="image-preview-actions">
                    <button type="button" class="btn-remove-image" onclick="removeProductImage(${id})">Remove Image</button>
                </div>
            `;
            preview.classList.add('active');
        } else {
            preview.classList.remove('active');
            preview.innerHTML = '';
        }
        
        document.getElementById('product-modal-title').textContent = 'Edit Product';
        document.getElementById('product-modal').classList.add('active');
    }
}

function removeProductImage(id) {
    const products = getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        delete products[index].image;
        saveProducts(products);
    }
    document.getElementById('product-image-preview').classList.remove('active');
    document.getElementById('product-image-preview').innerHTML = '';
    document.getElementById('product-image').value = '';
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        let products = getProducts();
        products = products.filter(p => p.id !== id);
        saveProducts(products);
        renderProducts();
    }
}

function toggleProductVisibility(id) {
    const products = getProducts();
    const product = products.find(p => p.id === id);
    if (product) {
        product.hidden = !product.hidden;
        saveProducts(products);
        renderProducts();
        if (typeof showToast === 'function') {
            showToast(product.hidden ? 'Product hidden from public view' : 'Product is now visible', 'success');
        }
    }
}

// Blog Management
function renderBlogPosts() {
    const posts = getBlogPosts();
    const container = document.getElementById('blog-list');
    
    if (posts.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No blog posts yet. Click "Add Blog Post" to create one.</p></div>';
        return;
    }
    
    container.innerHTML = posts.map(post => `
        <div class="admin-item ${post.hidden ? 'hidden-item' : ''}" data-id="${post.id}">
            <div class="admin-item-content">
                <h3>
                    ${post.emoji} ${post.title}
                    ${post.hidden ? '<span class="hidden-badge">Hidden</span>' : ''}
                </h3>
                <p>${post.excerpt}</p>
                <div class="admin-item-meta">
                    <span><strong>Date:</strong> ${post.date}</span>
                </div>
            </div>
            <div class="admin-item-actions">
                <button class="btn-toggle" onclick="toggleBlogPostVisibility(${post.id})">
                    ${post.hidden ? '👁️ Show' : '🙈 Hide'}
                </button>
                <button class="btn-edit" onclick="editBlogPost(${post.id})">Edit</button>
                <button class="btn-delete" onclick="deleteBlogPost(${post.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function editBlogPost(id) {
    const posts = getBlogPosts();
    const post = posts.find(p => p.id === id);
    
    if (post) {
        document.getElementById('blog-id').value = post.id;
        document.getElementById('blog-title').value = post.title;
        document.getElementById('blog-excerpt').value = post.excerpt;
        document.getElementById('blog-content').value = post.content || '';
        document.getElementById('blog-date').value = post.date;
        
        // Show existing image if available
        const preview = document.getElementById('blog-image-preview');
        if (post.image) {
            preview.innerHTML = `
                <img src="${post.image}" alt="Current image">
                <div class="image-preview-actions">
                    <button type="button" class="btn-remove-image" onclick="removeBlogImage(${id})">Remove Image</button>
                </div>
            `;
            preview.classList.add('active');
        } else {
            preview.classList.remove('active');
            preview.innerHTML = '';
        }
        
        document.getElementById('blog-modal-title').textContent = 'Edit Blog Post';
        document.getElementById('blog-modal').classList.add('active');
    }
}

function removeBlogImage(id) {
    const posts = getBlogPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index !== -1) {
        delete posts[index].image;
        saveBlogPosts(posts);
    }
    document.getElementById('blog-image-preview').classList.remove('active');
    document.getElementById('blog-image-preview').innerHTML = '';
    document.getElementById('blog-image').value = '';
}

function deleteBlogPost(id) {
    if (confirm('Are you sure you want to delete this blog post?')) {
        let posts = getBlogPosts();
        posts = posts.filter(p => p.id !== id);
        saveBlogPosts(posts);
        renderBlogPosts();
    }
}

function toggleBlogPostVisibility(id) {
    const posts = getBlogPosts();
    const post = posts.find(p => p.id === id);
    if (post) {
        post.hidden = !post.hidden;
        saveBlogPosts(posts);
        renderBlogPosts();
        if (typeof showToast === 'function') {
            showToast(post.hidden ? 'Blog post hidden from public view' : 'Blog post is now visible', 'success');
        }
    }
}

// Convert image file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initStorage();
    renderProducts();
    renderBlogPosts();
    
    // Tab navigation
    document.querySelectorAll('.admin-nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active tab
            document.querySelectorAll('.admin-nav-links a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding section
            const tab = this.dataset.tab;
            document.querySelectorAll('.admin-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(`${tab}-section`).classList.add('active');
        });
    });
    
    // Add Product button
    document.getElementById('add-product-btn').addEventListener('click', function() {
        document.getElementById('product-form').reset();
        document.getElementById('product-id').value = '';
        document.getElementById('product-image-preview').classList.remove('active');
        document.getElementById('product-image-preview').innerHTML = '';
        document.getElementById('product-modal-title').textContent = 'Add Product';
        document.getElementById('product-modal').classList.add('active');
    });
    
    // Add Blog button
    document.getElementById('add-blog-btn').addEventListener('click', function() {
        document.getElementById('blog-form').reset();
        document.getElementById('blog-id').value = '';
        document.getElementById('blog-image-preview').classList.remove('active');
        document.getElementById('blog-image-preview').innerHTML = '';
        document.getElementById('blog-modal-title').textContent = 'Add Blog Post';
        document.getElementById('blog-modal').classList.add('active');
    });
    
    // Product form submit
    document.getElementById('product-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const id = document.getElementById('product-id').value;
        const imageFile = document.getElementById('product-image').files[0];
        
        const product = {
            name: document.getElementById('product-name').value,
            description: document.getElementById('product-description').value,
            price: document.getElementById('product-price').value
        };
        
        // Handle image upload
        if (imageFile) {
            product.image = await fileToBase64(imageFile);
        } else if (!id) {
            // New product must have an image
            alert('Please upload a product image');
            return;
        }
        
        let products = getProducts();
        
        if (id) {
            // Update existing
            const index = products.findIndex(p => p.id === parseInt(id));
            products[index] = { ...products[index], ...product };
        } else {
            // Add new
            product.id = generateId(products);
            products.push(product);
        }
        
        saveProducts(products);
        renderProducts();
        document.getElementById('product-modal').classList.remove('active');
    });
    
    // Blog form submit
    document.getElementById('blog-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const id = document.getElementById('blog-id').value;
        const imageFile = document.getElementById('blog-image').files[0];
        
        const post = {
            title: document.getElementById('blog-title').value,
            excerpt: document.getElementById('blog-excerpt').value,
            content: document.getElementById('blog-content').value,
            date: document.getElementById('blog-date').value
        };
        
        // Handle image upload
        if (imageFile) {
            post.image = await fileToBase64(imageFile);
        } else if (!id) {
            // New post must have an image
            alert('Please upload a featured image');
            return;
        }
        
        let posts = getBlogPosts();
        
        if (id) {
            // Update existing
            const index = posts.findIndex(p => p.id === parseInt(id));
            posts[index] = { ...posts[index], ...post };
        } else {
            // Add new
            post.id = generateId(posts);
            posts.push(post);
        }
        
        saveBlogPosts(posts);
        renderBlogPosts();
        document.getElementById('blog-modal').classList.remove('active');
    });
    
    // Close modal buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });
    
    // Close modal on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Product image preview
    document.getElementById('product-image').addEventListener('change', function(e) {
        const file = e.target.files[0];
        const preview = document.getElementById('product-image-preview');
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <div class="image-preview-actions">
                        <button type="button" class="btn-remove-image" onclick="document.getElementById('product-image').value=''; document.getElementById('product-image-preview').classList.remove('active');">Remove Image</button>
                    </div>
                `;
                preview.classList.add('active');
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Blog image preview
    document.getElementById('blog-image').addEventListener('change', function(e) {
        const file = e.target.files[0];
        const preview = document.getElementById('blog-image-preview');
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <div class="image-preview-actions">
                        <button type="button" class="btn-remove-image" onclick="document.getElementById('blog-image').value=''; document.getElementById('blog-image-preview').classList.remove('active');">Remove Image</button>
                    </div>
                `;
                preview.classList.add('active');
            };
            reader.readAsDataURL(file);
        }
    });
});

// Make functions globally accessible
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.removeProductImage = removeProductImage;
window.editBlogPost = editBlogPost;
window.deleteBlogPost = deleteBlogPost;
window.removeBlogImage = removeBlogImage;
