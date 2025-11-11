// Secure Admin Authentication using Firebase Auth
// No hardcoded passwords - uses Firebase Authentication

// Initialize Firebase Auth
const auth = firebase.auth();

// Your admin email
const ADMIN_EMAIL = 'haikal@garudhiya.com';

// Check if user is authenticated and is admin
function isAdmin(user) {
    return user && user.email === ADMIN_EMAIL;
}

// Google Sign-In
function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    auth.signInWithPopup(provider)
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

// Create Account
function createAccount(email, password) {
    if (email !== ADMIN_EMAIL) {
        showMessage('Only the admin email can create an account.', 'error');
        return;
    }
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
            showMessage('Account created successfully! You can now sign in.', 'success');
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
    // Email/Password form
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        signInWithEmail(email, password);
    });
});
