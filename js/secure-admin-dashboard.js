// Secure Admin Dashboard using Firebase Auth
// Note: db is already declared in firebase-config.js
const auth = firebase.auth();

const ADMIN_EMAIL = 'haikal@garudhiya.com';

// Check authentication on page load
auth.onAuthStateChanged((user) => {
    if (!user) {
        // Not authenticated, redirect to login
        console.log('No user signed in, redirecting to login...');
        window.location.href = 'admin.html';
        return;
    }
    
    if (user.email !== ADMIN_EMAIL) {
        // Not admin email
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
    
    // Setup event listeners and load data
    setupEventListeners();
    loadBlogPosts();
    loadProducts();
    loadComments();
}, (error) => {
    console.error('Authentication error:', error);
    alert('Authentication error: ' + error.message);
});

// Setup all event listeners
function setupEventListeners() {
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
            
            // Update active tab button
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            
            // Update active tab content
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
    try {
        const snapshot = await db.collection('blogPosts').orderBy('date', 'desc').get();
        const blogList = document.getElementById('blog-list');
        
        if (snapshot.empty) {
            blogList.innerHTML = '<div style="padding: 2rem; text-align: center;">No blog posts yet.</div>';
            return;
        }
        
        blogList.innerHTML = '';
        snapshot.forEach(doc => {
            const post = doc.data();
            const postElement = document.createElement('div');
            postElement.className = 'item';
            postElement.innerHTML = `
                <div class="item-info">
                    <h4>${post.title} ${post.hidden ? '(Hidden)' : ''}</h4>
                    <p>${post.excerpt}</p>
                    <p>Date: ${post.date}</p>
                </div>
                <div class="item-actions">
                    <button class="btn btn-primary" onclick="editBlogPost('${doc.id}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteBlogPost('${doc.id}')">Delete</button>
                </div>
            `;
            blogList.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error loading blog posts:', error);
        showMessage('blog-message', 'Error loading blog posts: ' + error.message, 'error');
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
            document.getElementById('blog-image').value = post.image || '';
            document.getElementById('blog-hidden').checked = post.hidden || false;
            
            document.querySelector('#blog-form button[type="submit"]').textContent = 'Update Post';
        }
    } catch (error) {
        showMessage('blog-message', 'Error loading post: ' + error.message, 'error');
    }
}

async function deleteBlogPost(id) {
    if (confirm('Are you sure you want to delete this blog post?')) {
        try {
            await db.collection('blogPosts').doc(id).delete();
            showMessage('blog-message', 'Blog post deleted successfully!');
            loadBlogPosts();
        } catch (error) {
            showMessage('blog-message', 'Error deleting post: ' + error.message, 'error');
        }
    }
}

async function handleBlogSubmit(e) {
    e.preventDefault();
    
    const postData = {
        title: document.getElementById('blog-title').value,
        excerpt: document.getElementById('blog-excerpt').value,
        content: document.getElementById('blog-content').value,
        image: document.getElementById('blog-image').value || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjhmOWZhIi8+CjxwYXRoIGQ9Im0xNzUgMTAwIDUwLTUwaDEwMGwtNTAgNTAtNTAtNTB6IiBmaWxsPSIjZGRkIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiPkJsb2cgSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==',
        hidden: document.getElementById('blog-hidden').checked,
        date: new Date().toISOString().split('T')[0]
    };
    
    try {
        if (editingBlogId) {
            await db.collection('blogPosts').doc(editingBlogId).update(postData);
            showMessage('blog-message', 'Blog post updated successfully!');
        } else {
            const newId = getCurrentTimestamp().toString();
            await db.collection('blogPosts').doc(newId).set({
                ...postData,
                id: newId
            });
            showMessage('blog-message', 'Blog post created successfully!');
        }
        
        document.getElementById('blog-form').reset();
        editingBlogId = null;
        document.querySelector('#blog-form button[type="submit"]').textContent = 'Save Post';
        loadBlogPosts();
    } catch (error) {
        showMessage('blog-message', 'Error saving post: ' + error.message, 'error');
    }
}

function cancelBlogEdit() {
    document.getElementById('blog-form').reset();
    editingBlogId = null;
    document.querySelector('#blog-form button[type="submit"]').textContent = 'Save Post';
}

// Products Management
let editingProductId = null;

async function loadProducts() {
    try {
        const snapshot = await db.collection('products').get();
        const productList = document.getElementById('product-list');
        
        if (snapshot.empty) {
            productList.innerHTML = '<div style="padding: 2rem; text-align: center;">No products yet.</div>';
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
                    <p>Price: ${product.price} | Category: ${product.category}</p>
                </div>
                <div class="item-actions">
                    <button class="btn btn-primary" onclick="editProduct('${doc.id}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct('${doc.id}')">Delete</button>
                </div>
            `;
            productList.appendChild(productElement);
        });
    } catch (error) {
        console.error('Error loading products:', error);
        showMessage('product-message', 'Error loading products: ' + error.message, 'error');
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
            document.getElementById('product-image').value = product.image || '';
            
            document.querySelector('#product-form button[type="submit"]').textContent = 'Update Product';
        }
    } catch (error) {
        showMessage('product-message', 'Error loading product: ' + error.message, 'error');
    }
}

async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            await db.collection('products').doc(id).delete();
            showMessage('product-message', 'Product deleted successfully!');
            loadProducts();
        } catch (error) {
            showMessage('product-message', 'Error deleting product: ' + error.message, 'error');
        }
    }
}

async function handleProductSubmit(e) {
    e.preventDefault();
    
    const productData = {
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        price: document.getElementById('product-price').value,
        category: document.getElementById('product-category').value,
        image: document.getElementById('product-image').value || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjhmOWZhIi8+CjxwYXRoIGQ9Im03NSAxMDAgMjUtMjVoNTBsLTI1IDI1LTI1LTI1eiIgZmlsbD0iI2RkZCIvPgo8dGV4dCB4PSIxMDAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5Ij5Qcm9kdWN0PC90ZXh0Pgo8L3N2Zz4='
    };
    
    try {
        if (editingProductId) {
            await db.collection('products').doc(editingProductId).update(productData);
            showMessage('product-message', 'Product updated successfully!');
        } else {
            const newId = getCurrentTimestamp().toString();
            await db.collection('products').doc(newId).set({
                ...productData,
                id: newId
            });
            showMessage('product-message', 'Product created successfully!');
        }
        
        document.getElementById('product-form').reset();
        editingProductId = null;
        document.querySelector('#product-form button[type="submit"]').textContent = 'Save Product';
        loadProducts();
    } catch (error) {
        showMessage('product-message', 'Error saving product: ' + error.message, 'error');
    }
}

function cancelProductEdit() {
    document.getElementById('product-form').reset();
    editingProductId = null;
    document.querySelector('#product-form button[type="submit"]').textContent = 'Save Product';
}

// Comments Management
async function loadComments() {
    try {
        const snapshot = await db.collection('comments').orderBy('timestamp', 'desc').get();
        const commentList = document.getElementById('comment-list');
        
        if (snapshot.empty) {
            commentList.innerHTML = '<div style="padding: 2rem; text-align: center;">No comments yet.</div>';
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
                    <p>Post ID: ${comment.postId} | Date: ${formatDate(comment.timestamp)}</p>
                </div>
                <div class="item-actions">
                    <button class="btn btn-danger" onclick="deleteComment('${doc.id}')">Delete</button>
                </div>
            `;
            commentList.appendChild(commentElement);
        });
    } catch (error) {
        console.error('Error loading comments:', error);
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
