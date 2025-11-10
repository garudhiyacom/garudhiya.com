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
const storage = firebase.storage();

console.log('✅ Firebase initialized successfully');
