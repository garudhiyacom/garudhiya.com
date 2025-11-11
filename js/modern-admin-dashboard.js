// Modern Admin Dashboard with Image Upload
// Note: db and storage are already declared in firebase-config.js
const auth = firebase.auth();

const ADMIN_EMAIL = 'haikal@garudhiya.com';

console.log('🎨 Modern Admin Dashboard loaded');

// Check authentication
auth.onAuthStateChanged((user) => {
    console.log('🔐 Auth state changed, user:', user ? user.email : 'none');
    if (!user) {
        console.log('No user signed in, redirecting to login...');
        window.location.href = 'admin.html';
        return;
    }
    
    if (user.email !== ADMIN_EMAIL) {
        console.log('User email does not match admin email');
        alert('Access denied. Only ' + ADMIN_EMAIL + ' can access this dashboard.');
        auth.signOut().then(() => {
            window.location.href = 'admin.html';
        });
        return;
    }
    
    // User is authenticated and is admin
    console.log('✅ Authenticated as admin:', user.email);
    document.getElementById('admin-email').textContent = user.email;
    
    // Setup everything
    setupEventListeners();
    setupImageUploads();
    loadBlogPosts();
    loadProducts();
    loadComments();
});

// Setup all event listeners
function setupEventListeners() {
    console.log('🔧 Setting up event listeners...');
    
    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        auth.signOut().then(() => {
            window.location.href = 'admin.html';
        });
    });

    // Tab switching
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;
            
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.getElementById(tabName + '-tab').classList.add('active');
        });
    });
    
    // Blog form
    document.getElementById('blog-form').addEventListener('submit', handleBlogSubmit);
    document.getElementById('cancel-blog').addEventListener('click', cancelBlogEdit);
    
    // Product form
    document.getElementById('product-form').addEventListener('submit', handleProductSubmit);
    document.getElementById('cancel-product').addEventListener('click', cancelProductEdit);
    
    // Set today's date as default
    document.getElementById('blog-date').valueAsDate = new Date();
    
    console.log('✅ Event listeners setup complete!');
}

// Setup image upload handlers
function setupImageUploads() {
    console.log('📸 Setting up image uploads...');
    
    // Blog image upload
    setupImageUpload('blog');
    
    // Product image upload
    setupImageUpload('product');
    
    console.log('✅ Image uploads setup complete!');
}

function setupImageUpload(type) {
    const uploadArea = document.getElementById(`${type}-image-upload`);
    const fileInput = document.getElementById(`${type}-image-file`);
    const preview = document.getElementById(`${type}-image-preview`);
    
    // Click to upload
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    // File selected
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file, type);
        }
    });
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file, type);
        }
    });
}

async function handleImageUpload(file, type) {
    console.log(`📤 Uploading ${type} image:`, file.name);
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        showMessage(`${type}-message`, 'Image too large. Maximum size is 5MB.', 'error');
        return;
    }
    
    // Show progress
    const progressDiv = document.getElementById(`${type}-upload-progress`);
    const progressFill = document.getElementById(`${type}-progress-fill`);
    const progressText = document.getElementById(`${type}-progress-text`);
    const preview = document.getElementById(`${type}-image-preview`);
    
    progressDiv.style.display = 'block';
    progressFill.style.width = '0%';
    
    try {
        // Create a unique filename
        const timestamp = Date.now();
        const filename = `${type}s/${timestamp}_${file.name}`;
        
        // Upload to Firebase Storage
        const storageRef = storage.ref(filename);
        const uploadTask = storageRef.put(file);
        
        // Monitor upload progress
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressFill.style.width = progress + '%';
                progressText.textContent = `Uploading... ${Math.round(progress)}%`;
            },
            (error) => {
                console.error('Upload error:', error);
                showMessage(`${type}-message`, 'Upload failed: ' + error.message, 'error');
                progressDiv.style.display = 'none';
            },
            async () => {
                // Upload complete, get download URL
                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                console.log('✅ Upload complete:', downloadURL);
                
                // Store URL in hidden input
                document.getElementById(`${type}-image-url`).value = downloadURL;
                
                // Show preview
                preview.innerHTML = `<img src="${downloadURL}" alt="Preview">`;
                
                // Hide progress, show success
                progressDiv.style.display = 'none';
                showMessage(`${type}-message`, '✅ Image uploaded successfully!', 'success');
            }
        );
    } catch (error) {
        console.error('Upload error:', error);
        showMessage(`${type}-message`, 'Upload failed: ' + error.message, 'error');
        progressDiv.style.display = 'none';
    }
}

// Utility functions
function showMessage(elementId, message, type = 'success') {
    const messageDiv = document.getElementById(elementId);
    messageDiv.innerHTML = `<div class="message ${type}">${message}</div>`;
    setTimeout(() => {
        messageDiv.innerHTML = '';
    }, 5000);
}

function getCurrentTimestamp() {
    return Date.now();
}

function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString();
}

// Blog Posts Management
let editingBlogId = null;

async function loadBlogPosts() {
    console.log('📝 Loading blog posts...');
    try {
        const snapshot = await db.collection('blogPosts').orderBy('date', 'desc').get();
        const blogList = document.getElementById('blog-list');
        
        console.log('Found', snapshot.size, 'blog posts');
        
        if (snapshot.empty) {
            blogList.innerHTML = '<div class="loading">No blog posts yet. Create your first one above!</div>';
            return;
        }
        
        blogList.innerHTML = '';
        snapshot.forEach(doc => {
            const post = doc.data();
            const postElement = document.createElement('div');
            postElement.className = 'item';
            postElement.innerHTML = `
                <div class="item-info">
                    <h4>${post.title}${post.hidden ? '<span class="item-badge">Hidden</span>' : ''}</h4>
                    <p>${post.excerpt}</p>
                    <p><strong>Date:</strong> ${post.date} | <strong>ID:</strong> ${doc.id}</p>
                </div>
                <div class="item-actions">
                    <button class="btn btn-primary btn-small" onclick="editBlogPost('${doc.id}')">✏️ Edit</button>
                    <button class="btn btn-danger btn-small" onclick="deleteBlogPost('${doc.id}')">🗑️ Delete</button>
                </div>
            `;
            blogList.appendChild(postElement);
        });
        console.log('✅ Blog posts loaded successfully');
    } catch (error) {
        console.error('❌ Error loading blog posts:', error);
        document.getElementById('blog-list').innerHTML = `<div class="loading">Error loading blog posts: ${error.message}</div>`;
    }
}

async function editBlogPost(id) {
    try {
        const doc = await db.collection('blogPosts').doc(id).get();
        if (doc.exists) {
            const post = doc.data();
            editingBlogId = id;
            
            document.getElementById('blog-id').value = id;
            document.getElementById('blog-title').value = post.title || '';
            document.getElementById('blog-excerpt').value = post.excerpt || '';
            document.getElementById('blog-content').value = post.content || '';
            document.getElementById('blog-date').value = post.date || '';
            document.getElementById('blog-hidden').checked = post.hidden || false;
            document.getElementById('blog-image-url').value = post.image || '';
            
            // Show image preview if exists
            if (post.image) {
                document.getElementById('blog-image-preview').innerHTML = `<img src="${post.image}" alt="Preview">`;
            }
            
            document.querySelector('#blog-form button[type="submit"]').innerHTML = '💾 Update Post';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        showMessage('blog-message', 'Error loading post: ' + error.message, 'error');
    }
}

async function deleteBlogPost(id) {
    if (confirm('Are you sure you want to delete this blog post? This cannot be undone!')) {
        try {
            await db.collection('blogPosts').doc(id).delete();
            showMessage('blog-message', '✅ Blog post deleted successfully!', 'success');
            loadBlogPosts();
        } catch (error) {
            showMessage('blog-message', '❌ Error deleting post: ' + error.message, 'error');
        }
    }
}

async function handleBlogSubmit(e) {
    e.preventDefault();
    
    const imageUrl = document.getElementById('blog-image-url').value || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjhmOWZhIi8+CjxwYXRoIGQ9Im0xNzUgMTAwIDUwLTUwaDEwMGwtNTAgNTAtNTAtNTB6IiBmaWxsPSIjZGRkIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiPkJsb2cgSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==';
    
    const postData = {
        title: document.getElementById('blog-title').value,
        excerpt: document.getElementById('blog-excerpt').value,
        content: document.getElementById('blog-content').value,
        image: imageUrl,
        hidden: document.getElementById('blog-hidden').checked,
        date: document.getElementById('blog-date').value || new Date().toISOString().split('T')[0]
    };
    
    try {
        if (editingBlogId) {
            await db.collection('blogPosts').doc(editingBlogId).update(postData);
            showMessage('blog-message', '✅ Blog post updated successfully!', 'success');
        } else {
            const newId = getCurrentTimestamp().toString();
            await db.collection('blogPosts').doc(newId).set({
                ...postData,
                id: newId
            });
            showMessage('blog-message', '✅ Blog post created successfully!', 'success');
        }
        
        document.getElementById('blog-form').reset();
        document.getElementById('blog-image-preview').innerHTML = '';
        document.getElementById('blog-date').valueAsDate = new Date();
        editingBlogId = null;
        document.querySelector('#blog-form button[type="submit"]').innerHTML = '💾 Save Post';
        loadBlogPosts();
    } catch (error) {
        showMessage('blog-message', '❌ Error saving post: ' + error.message, 'error');
    }
}

function cancelBlogEdit() {
    document.getElementById('blog-form').reset();
    document.getElementById('blog-image-preview').innerHTML = '';
    document.getElementById('blog-date').valueAsDate = new Date();
    editingBlogId = null;
    document.querySelector('#blog-form button[type="submit"]').innerHTML = '💾 Save Post';
}

// Products Management
let editingProductId = null;

async function loadProducts() {
    console.log('🛍️ Loading products...');
    try {
        const snapshot = await db.collection('products').get();
        const productList = document.getElementById('product-list');
        
        console.log('Found', snapshot.size, 'products');
        
        if (snapshot.empty) {
            productList.innerHTML = '<div class="loading">No products yet. Create your first one above!</div>';
            return;
        }
        
        productList.innerHTML = '';
        snapshot.forEach(doc => {
            const product = doc.data();
            const productElement = document.createElement('div');
            productElement.className = 'item';
            productElement.innerHTML = `
                <div class="item-info">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <p><strong>Price:</strong> ${product.price} | <strong>Category:</strong> ${product.category}</p>
                </div>
                <div class="item-actions">
                    <button class="btn btn-primary btn-small" onclick="editProduct('${doc.id}')">✏️ Edit</button>
                    <button class="btn btn-danger btn-small" onclick="deleteProduct('${doc.id}')">🗑️ Delete</button>
                </div>
            `;
            productList.appendChild(productElement);
        });
        console.log('✅ Products loaded successfully');
    } catch (error) {
        console.error('❌ Error loading products:', error);
        document.getElementById('product-list').innerHTML = `<div class="loading">Error loading products: ${error.message}</div>`;
    }
}

async function editProduct(id) {
    try {
        const doc = await db.collection('products').doc(id).get();
        if (doc.exists) {
            const product = doc.data();
            editingProductId = id;
            
            document.getElementById('product-id').value = id;
            document.getElementById('product-name').value = product.name || '';
            document.getElementById('product-description').value = product.description || '';
            document.getElementById('product-price').value = product.price || '';
            document.getElementById('product-category').value = product.category || '';
            document.getElementById('product-image-url').value = product.image || '';
            
            // Show image preview if exists
            if (product.image) {
                document.getElementById('product-image-preview').innerHTML = `<img src="${product.image}" alt="Preview">`;
            }
            
            document.querySelector('#product-form button[type="submit"]').innerHTML = '💾 Update Product';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        showMessage('product-message', 'Error loading product: ' + error.message, 'error');
    }
}

async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product? This cannot be undone!')) {
        try {
            await db.collection('products').doc(id).delete();
            showMessage('product-message', '✅ Product deleted successfully!', 'success');
            loadProducts();
        } catch (error) {
            showMessage('product-message', '❌ Error deleting product: ' + error.message, 'error');
        }
    }
}

async function handleProductSubmit(e) {
    e.preventDefault();
    
    const imageUrl = document.getElementById('product-image-url').value || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjhmOWZhIi8+CjxwYXRoIGQ9Im03NSAxMDAgMjUtMjVoNTBsLTI1IDI1LTI1LTI1eiIgZmlsbD0iI2RkZCIvPgo8dGV4dCB4PSIxMDAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5Ij5Qcm9kdWN0PC90ZXh0Pgo8L3N2Zz4=';
    
    const productData = {
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        price: document.getElementById('product-price').value,
        category: document.getElementById('product-category').value,
        image: imageUrl
    };
    
    try {
        if (editingProductId) {
            await db.collection('products').doc(editingProductId).update(productData);
            showMessage('product-message', '✅ Product updated successfully!', 'success');
        } else {
            const newId = getCurrentTimestamp().toString();
            await db.collection('products').doc(newId).set({
                ...productData,
                id: newId
            });
            showMessage('product-message', '✅ Product created successfully!', 'success');
        }
        
        document.getElementById('product-form').reset();
        document.getElementById('product-image-preview').innerHTML = '';
        editingProductId = null;
        document.querySelector('#product-form button[type="submit"]').innerHTML = '💾 Save Product';
        loadProducts();
    } catch (error) {
        showMessage('product-message', '❌ Error saving product: ' + error.message, 'error');
    }
}

function cancelProductEdit() {
    document.getElementById('product-form').reset();
    document.getElementById('product-image-preview').innerHTML = '';
    editingProductId = null;
    document.querySelector('#product-form button[type="submit"]').innerHTML = '💾 Save Product';
}

// Comments Management
async function loadComments() {
    console.log('💬 Loading comments...');
    try {
        const snapshot = await db.collection('comments').orderBy('timestamp', 'desc').get();
        const commentList = document.getElementById('comment-list');
        
        console.log('Found', snapshot.size, 'comments');
        
        if (snapshot.empty) {
            commentList.innerHTML = '<div class="loading">No comments yet.</div>';
            return;
        }
        
        commentList.innerHTML = '';
        snapshot.forEach(doc => {
            const comment = doc.data();
            const commentElement = document.createElement('div');
            commentElement.className = 'item';
            commentElement.innerHTML = `
                <div class="item-info">
                    <h4>${comment.name}</h4>
                    <p>${comment.text}</p>
                    <p><strong>Post ID:</strong> ${comment.postId} | <strong>Date:</strong> ${formatDate(comment.timestamp)}</p>
                </div>
                <div class="item-actions">
                    <button class="btn btn-danger btn-small" onclick="deleteComment('${doc.id}')">🗑️ Delete</button>
                </div>
            `;
            commentList.appendChild(commentElement);
        });
        console.log('✅ Comments loaded successfully');
    } catch (error) {
        console.error('❌ Error loading comments:', error);
        document.getElementById('comment-list').innerHTML = `<div class="loading">Error loading comments: ${error.message}</div>`;
    }
}

async function deleteComment(id) {
    if (confirm('Are you sure you want to delete this comment?')) {
        try {
            await db.collection('comments').doc(id).delete();
            loadComments();
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    }
}

// Make functions global for onclick handlers
window.editBlogPost = editBlogPost;
window.deleteBlogPost = deleteBlogPost;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.deleteComment = deleteComment;
