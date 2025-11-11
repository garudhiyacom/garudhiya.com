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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const db = firebase.firestore();

// Initialize storage only if available
let storage = null;
if (firebase.storage) {
    storage = firebase.storage();
    console.log('✅ Firebase Storage initialized');
} else {
    console.warn('⚠️ Firebase Storage not loaded');
}

console.log('✅ Firebase initialized successfully');
