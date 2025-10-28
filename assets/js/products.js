// ========================================
// PRODUCTS DATA
// ========================================

const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation and superior sound quality.",
        price: "$199.99",
        img: "assets/images/product1.jpg",
        category: "Electronics"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        description: "Track your health and fitness goals with this advanced smartwatch featuring heart rate monitoring.",
        price: "$149.99",
        img: "assets/images/product2.jpg",
        category: "Wearables"
    },
    {
        id: 3,
        name: "Portable Bluetooth Speaker",
        description: "Compact and powerful speaker with 12-hour battery life and waterproof design.",
        price: "$79.99",
        img: "assets/images/product3.jpg",
        category: "Audio"
    },
    {
        id: 4,
        name: "Laptop Stand",
        description: "Ergonomic aluminum laptop stand for improved posture and comfort during work.",
        price: "$49.99",
        img: "assets/images/product4.jpg",
        category: "Accessories"
    },
    {
        id: 5,
        name: "Wireless Keyboard & Mouse",
        description: "Sleek wireless keyboard and mouse combo with long battery life and comfortable typing experience.",
        price: "$89.99",
        img: "assets/images/product5.jpg",
        category: "Accessories"
    },
    {
        id: 6,
        name: "4K Webcam",
        description: "Professional-grade 4K webcam with auto-focus and built-in microphone for crystal-clear video calls.",
        price: "$129.99",
        img: "assets/images/product6.jpg",
        category: "Electronics"
    }
];

// ========================================
// PRODUCT UTILITY FUNCTIONS
// ========================================

// Get product by ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Get random products
function getRandomProducts(count = 4) {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, products.length));
}

// ========================================
// PRODUCT PAGE FUNCTIONS
// ========================================

// Create product card HTML
function createProductCard(product) {
    return `
        <h2>${product.name}</h2>
        <img src="${product.img}" alt="${product.name}" onerror="this.src='assets/images/placeholder.jpg'">
        <p><strong>Category:</strong> ${product.category}</p>
        <p>${product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>
    `;
}

// Load product cards on products.html
function loadProductCards() {
    const main = document.querySelector('main');
    if (!main) return;
    
    if (!products || products.length === 0) {
        main.innerHTML = '<article><h2>No products available</h2><p>Check back soon for new products!</p></article>';
        return;
    }
    
    products.forEach(product => {
        const article = document.createElement('article');
        article.innerHTML = createProductCard(product);
        main.appendChild(article);
    });
}

// ========================================
// PAGE INITIALIZATION
// ========================================

// Initialize products page
function initProductsPage() {
    if (window.location.pathname.includes('products.html')) {
        loadProductCards();
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', initProductsPage);
