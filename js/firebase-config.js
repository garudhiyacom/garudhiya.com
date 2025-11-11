// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6h3BOMic5rOhR0htEebFJJAXt-p4rcd4",
    authDomain: "garudhiyasite.firebaseapp.com",
    projectId: "garudhiyasite",
    storageBucket: "garudhiyasite.firebasestorage.app",
    messagingSenderId: "419040913883",
    appId: "1:419040913883:web:9d8d7f6b450140b695dffe",
    measurementId: "G-ELT2EH6MQ1"
};

// Initialize Firebase (only if not already initialized)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase app initialized');
} else {
    console.log('ℹ️ Firebase app already initialized');
}

// Initialize services (use var to allow redeclaration)
var db = firebase.firestore();

// Initialize storage only if available
var storage = null;
if (firebase.storage) {
    storage = firebase.storage();
    console.log('✅ Firebase Storage initialized');
} else {
    console.warn('⚠️ Firebase Storage not loaded');
}

console.log('✅ Firebase config loaded successfully');
