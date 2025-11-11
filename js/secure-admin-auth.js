// Secure Admin Authentication using Firebase Auth
// No hardcoded passwords - uses Firebase Authentication
// Version: 2.0 - Simplified (no Google sign-in)

// Initialize Firebase Auth
const auth = firebase.auth();

// Your admin email
const ADMIN_EMAIL = 'haikal@garudhiya.com';

// Check if user is authenticated and is admin
function isAdmin(user) {
    return user && user.email === ADMIN_EMAIL;
}

// Email/Password Sign-In
function signInWithEmail(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((result) => {
            const user = result.user;
            if (isAdmin(user)) {
                showMessage('Login successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'admin-dashboard.html';
                }, 1000);
            } else {
                showMessage('Access denied. Only admin can access this panel.', 'error');
                auth.signOut();
            }
        })
        .catch((error) => {
            showMessage('Error: ' + error.message, 'error');
        });
}


// Show message
function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
}

// Check if user is already signed in
auth.onAuthStateChanged((user) => {
    if (user && isAdmin(user)) {
        // User is signed in and is admin, redirect to dashboard
        window.location.href = 'admin-dashboard.html';
    }
});

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 Admin Login Page');
    console.log('⚠️ Account creation is disabled for security.');
    console.log('📧 Contact administrator to create account via Firebase Console.');
    
    // Email/Password form
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        console.log('🔑 Attempting login with:', email);
        signInWithEmail(email, password);
    });
});
