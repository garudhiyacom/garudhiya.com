// Admin authentication
const AUTH_CONFIG = {
    username: 'admin',
    password: 'kaefadaboe'
};

// Rate limiting configuration
const RATE_LIMIT = {
    maxAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes
    attemptWindow: 5 * 60 * 1000 // 5 minutes
};

function isAuthenticated() {
    return localStorage.getItem('adminAuth') === 'true';
}

function checkRateLimit() {
    const attempts = JSON.parse(localStorage.getItem('loginAttempts') || '[]');
    const now = Date.now();
    
    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(time => now - time < RATE_LIMIT.attemptWindow);
    
    // Check if locked out
    const lockoutUntil = localStorage.getItem('lockoutUntil');
    if (lockoutUntil && now < parseInt(lockoutUntil)) {
        const remainingTime = Math.ceil((parseInt(lockoutUntil) - now) / 60000);
        return {
            allowed: false,
            message: `Too many failed attempts. Try again in ${remainingTime} minute(s).`
        };
    }
    
    // Check if too many attempts
    if (recentAttempts.length >= RATE_LIMIT.maxAttempts) {
        const lockoutTime = now + RATE_LIMIT.lockoutDuration;
        localStorage.setItem('lockoutUntil', lockoutTime.toString());
        return {
            allowed: false,
            message: `Too many failed attempts. Account locked for 15 minutes.`
        };
    }
    
    return { allowed: true };
}

function recordFailedAttempt() {
    const attempts = JSON.parse(localStorage.getItem('loginAttempts') || '[]');
    attempts.push(Date.now());
    localStorage.setItem('loginAttempts', JSON.stringify(attempts));
}

function clearLoginAttempts() {
    localStorage.removeItem('loginAttempts');
    localStorage.removeItem('lockoutUntil');
}

function login(username, password) {
    // Check rate limit first
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
        return { success: false, message: rateCheck.message };
    }
    
    if (username === AUTH_CONFIG.username && password === AUTH_CONFIG.password) {
        localStorage.setItem('adminAuth', 'true');
        clearLoginAttempts(); // Clear failed attempts on success
        return { success: true };
    }
    
    recordFailedAttempt();
    return { success: false, message: 'Invalid username or password' };
}

function logout() {
    localStorage.removeItem('adminAuth');
    window.location.href = 'admin.html';
}

// Protect dashboard
const isDashboard = window.location.pathname.includes('admin-dashboard.html');
if (isDashboard && !isAuthenticated()) {
    window.location.href = 'admin.html';
}

// Everything runs after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Login form handler
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const message = document.getElementById('login-message');
            
            const result = login(username, password);
            
            if (result.success) {
                message.textContent = 'Login successful! Redirecting...';
                message.className = 'form-message success';
                message.style.display = 'block';
                
                setTimeout(function() {
                    window.location.href = 'admin-dashboard.html?login=success';
                }, 500);
            } else {
                message.textContent = result.message;
                message.className = 'form-message error';
                message.style.display = 'block';
            }
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});
