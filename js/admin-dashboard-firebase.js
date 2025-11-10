// Admin Dashboard with Firebase Integration
// This replaces localStorage with Firebase Firestore and Storage

// Check authentication
if (!isAuthenticated()) {
    window.location.href = 'admin.html';
}

// Logout function
function logout() {
    localStorage.removeItem('adminAuth');
    window.location.href = 'admin.html';
}

// Products Management
async function renderProducts() {
    const container = document.getElementById('products-list');
    container.innerHTML = '<div class="loading">Loading products...</div>';
    
    try {
        const products = await getProductsFromFirebase();
        
        if (products.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No products yet. Click "Add Product" to create one.</p></div>';
            return;
        }
        
        container.innerHTML = products.map(product => `
            <div class="admin-item ${product.hidden ? 'hidden-item' : ''}" data-id="${product.id}">
                <div class="admin-item-content">
                    <h3>${product.emoji || '📦'} ${product.name}</h3>
                    ${product.image ? `<img src="${product.image}" alt="${product.name}" style="max-width: 200px; margin: 10px 0; border-radius: 8px;">` : ''}
                    <p>${product.description}</p>
                    <div class="admin-item-meta">
                        <span><strong>Price:</strong> ${product.price}</span>
                    </div>
                </div>
                <div class="admin-item-actions">
                    <button class="btn-toggle" onclick="toggleProductVisibility('${product.id}')">
                        ${product.hidden ? '👁️ Show' : '🙈 Hide'}
                    </button>
                    <button class="btn-edit" onclick="editProduct('${product.id}')">Edit</button>
                    <button class="btn-delete" onclick="deleteProduct('${product.id}')">Delete</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error rendering products:', error);
        container.innerHTML = '<div class="empty-state"><p>Error loading products. Please refresh.</p></div>';
    }
}

async function renderBlogPosts() {
    const container = document.getElementById('blog-posts-list');
    container.innerHTML = '<div class="loading">Loading blog posts...</div>';
    
    try {
        const posts = await getBlogPostsFromFirebase();
        
        if (posts.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No blog posts yet. Click "Add New Post" to create one.</p></div>';
            return;
        }
        
        container.innerHTML = posts.map(post => `
            <div class="admin-item ${post.hidden ? 'hidden-item' : ''}" data-id="${post.id}">
                <div class="admin-item-content">
                    <h3>${post.title}</h3>
                    ${post.image ? `<img src="${post.image}" alt="${post.title}" style="max-width: 200px; margin: 10px 0; border-radius: 8px;">` : ''}
                    <p>${post.excerpt}</p>
                    <div class="admin-item-meta">
                        <span><strong>Date:</strong> ${post.date}</span>
                    </div>
                </div>
                <div class="admin-item-actions">
                    <button class="btn-toggle" onclick="toggleBlogPostVisibility('${post.id}')">
                        ${post.hidden ? '👁️ Show' : '🙈 Hide'}
                    </button>
                    <button class="btn-edit" onclick="editBlogPost('${post.id}')">Edit</button>
                    <button class="btn-delete" onclick="deleteBlogPost('${post.id}')">Delete</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error rendering blog posts:', error);
        container.innerHTML = '<div class="empty-state"><p>Error loading posts. Please refresh.</p></div>';
    }
}

// Product Functions
function openProductModal() {
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
    document.getElementById('product-image-preview').innerHTML = '';
    document.getElementById('product-image-preview').classList.remove('active');
    document.getElementById('product-modal-title').textContent = 'Add New Product';
    document.getElementById('product-modal').classList.add('active');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
}

async function saveProduct(event) {
    event.preventDefault();
    
    const id = document.getElementById('product-id').value;
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;
    const emoji = document.getElementById('product-emoji').value;
    const imageFile = document.getElementById('product-image').files[0];
    
    try {
        let imageUrl = '';
        
        // Upload image if new file selected
        if (imageFile) {
            imageUrl = await uploadImageToFirebase(imageFile, 'products');
        } else if (id) {
            // Keep existing image if editing
            const products = await getProductsFromFirebase();
            const existing = products.find(p => p.id === id);
            imageUrl = existing?.image || '';
        }
        
        const product = {
            id: id || db.collection('products').doc().id,
            name,
            description,
            price,
            emoji: emoji || '📦',
            image: imageUrl,
            hidden: false
        };
        
        await saveProductToFirebase(product);
        await renderProducts();
        closeProductModal();
        showToast('Product saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving product:', error);
        showToast('Error saving product. Please try again.', 'error');
    }
}

async function editProduct(id) {
    try {
        const products = await getProductsFromFirebase();
        const product = products.find(p => p.id === id);
        
        if (product) {
            document.getElementById('product-id').value = product.id;
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-description').value = product.description;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-emoji').value = product.emoji || '';
            
            const preview = document.getElementById('product-image-preview');
            if (product.image) {
                preview.innerHTML = `<img src="${product.image}" alt="Current image">`;
                preview.classList.add('active');
            }
            
            document.getElementById('product-modal-title').textContent = 'Edit Product';
            document.getElementById('product-modal').classList.add('active');
        }
    } catch (error) {
        console.error('Error editing product:', error);
        showToast('Error loading product. Please try again.', 'error');
    }
}

async function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
        await deleteProductFromFirebase(id);
        await renderProducts();
        showToast('Product deleted successfully!', 'success');
    } catch (error) {
        console.error('Error deleting product:', error);
        showToast('Error deleting product. Please try again.', 'error');
    }
}

async function toggleProductVisibility(id) {
    try {
        const products = await getProductsFromFirebase();
        const product = products.find(p => p.id === id);
        
        if (product) {
            product.hidden = !product.hidden;
            await saveProductToFirebase(product);
            await renderProducts();
            showToast(`Product ${product.hidden ? 'hidden' : 'shown'} successfully!`, 'success');
        }
    } catch (error) {
        console.error('Error toggling visibility:', error);
        showToast('Error updating product. Please try again.', 'error');
    }
}

// Blog Post Functions
function openBlogModal() {
    document.getElementById('blog-form').reset();
    document.getElementById('blog-id').value = '';
    document.getElementById('blog-image-preview').innerHTML = '';
    document.getElementById('blog-image-preview').classList.remove('active');
    document.getElementById('blog-modal-title').textContent = 'Add New Blog Post';
    document.getElementById('blog-modal').classList.add('active');
}

function closeBlogModal() {
    document.getElementById('blog-modal').classList.remove('active');
}

async function saveBlogPost(event) {
    event.preventDefault();
    
    const id = document.getElementById('blog-id').value;
    const title = document.getElementById('blog-title').value;
    const excerpt = document.getElementById('blog-excerpt').value;
    const content = document.getElementById('blog-content').value;
    const date = document.getElementById('blog-date').value;
    const imageFile = document.getElementById('blog-image').files[0];
    
    try {
        let imageUrl = '';
        
        // Upload image if new file selected
        if (imageFile) {
            imageUrl = await uploadImageToFirebase(imageFile, 'blog');
        } else if (id) {
            // Keep existing image if editing
            const posts = await getBlogPostsFromFirebase();
            const existing = posts.find(p => p.id === id);
            imageUrl = existing?.image || '';
        }
        
        const post = {
            id: id || db.collection('blogPosts').doc().id,
            title,
            excerpt,
            content,
            date,
            image: imageUrl,
            hidden: false
        };
        
        await saveBlogPostToFirebase(post);
        await renderBlogPosts();
        closeBlogModal();
        showToast('Blog post saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving blog post:', error);
        showToast('Error saving blog post. Please try again.', 'error');
    }
}

async function editBlogPost(id) {
    try {
        const posts = await getBlogPostsFromFirebase();
        const post = posts.find(p => p.id === id);
        
        if (post) {
            document.getElementById('blog-id').value = post.id;
            document.getElementById('blog-title').value = post.title;
            document.getElementById('blog-excerpt').value = post.excerpt;
            document.getElementById('blog-content').value = post.content || '';
            document.getElementById('blog-date').value = post.date;
            
            const preview = document.getElementById('blog-image-preview');
            if (post.image) {
                preview.innerHTML = `<img src="${post.image}" alt="Current image">`;
                preview.classList.add('active');
            }
            
            document.getElementById('blog-modal-title').textContent = 'Edit Blog Post';
            document.getElementById('blog-modal').classList.add('active');
        }
    } catch (error) {
        console.error('Error editing blog post:', error);
        showToast('Error loading blog post. Please try again.', 'error');
    }
}

async function deleteBlogPost(id) {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
        await deleteBlogPostFromFirebase(id);
        await renderBlogPosts();
        showToast('Blog post deleted successfully!', 'success');
    } catch (error) {
        console.error('Error deleting blog post:', error);
        showToast('Error deleting blog post. Please try again.', 'error');
    }
}

async function toggleBlogPostVisibility(id) {
    try {
        const posts = await getBlogPostsFromFirebase();
        const post = posts.find(p => p.id === id);
        
        if (post) {
            post.hidden = !post.hidden;
            await saveBlogPostToFirebase(post);
            await renderBlogPosts();
            showToast(`Blog post ${post.hidden ? 'hidden' : 'shown'} successfully!`, 'success');
        }
    } catch (error) {
        console.error('Error toggling visibility:', error);
        showToast('Error updating blog post. Please try again.', 'error');
    }
}

// Image preview handlers
document.addEventListener('DOMContentLoaded', function() {
    // Product image preview
    const productImageInput = document.getElementById('product-image');
    if (productImageInput) {
        productImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('product-image-preview');
                    preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                    preview.classList.add('active');
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Blog image preview
    const blogImageInput = document.getElementById('blog-image');
    if (blogImageInput) {
        blogImageInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('blog-image-preview');
                    preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                    preview.classList.add('active');
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Tab navigation
    document.querySelectorAll('.admin-nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            document.querySelectorAll('.admin-nav-links a').forEach(l => l.classList.remove('active'));
            document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const target = this.getAttribute('data-tab');
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Initialize
    renderProducts();
    renderBlogPosts();
});

// Toast notification helper
function showToast(message, type = 'info') {
    if (typeof window.showToast === 'function') {
        window.showToast(message, type);
    } else {
        alert(message);
    }
}
