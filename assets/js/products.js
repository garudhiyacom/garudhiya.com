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
    },
    {
        id: 7,
        name: "USB-C Hub Adapter",
        description: "Versatile 7-in-1 USB-C hub with HDMI, USB 3.0 ports, and SD card reader.",
        price: "$39.99",
        img: "assets/images/product1.jpg",
        category: "Accessories"
    },
    {
        id: 8,
        name: "Noise Cancelling Earbuds",
        description: "True wireless earbuds with active noise cancellation and 24-hour battery life.",
        price: "$159.99",
        img: "assets/images/product2.jpg",
        category: "Audio"
    },
    {
        id: 9,
        name: "Mechanical Gaming Keyboard",
        description: "RGB backlit mechanical keyboard with customizable keys and N-key rollover.",
        price: "$119.99",
        img: "assets/images/product3.jpg",
        category: "Gaming"
    },
    {
        id: 10,
        name: "Portable SSD 1TB",
        description: "Ultra-fast external SSD with USB 3.2 Gen 2 for quick file transfers and backups.",
        price: "$129.99",
        img: "assets/images/product1.jpg",
        category: "Storage"
    },
    {
        id: 11,
        name: "Wireless Charging Pad",
        description: "Fast wireless charger compatible with all Qi-enabled devices, sleek design.",
        price: "$29.99",
        img: "assets/images/product2.jpg",
        category: "Accessories"
    },
    {
        id: 12,
        name: "HD Webcam with Ring Light",
        description: "1080p webcam with built-in adjustable ring light for perfect video calls.",
        price: "$89.99",
        img: "assets/images/product3.jpg",
        category: "Electronics"
    },
    {
        id: 13,
        name: "Gaming Mouse",
        description: "High-precision gaming mouse with customizable DPI, RGB lighting, and programmable buttons.",
        price: "$59.99",
        img: "assets/images/product1.jpg",
        category: "Gaming"
    },
    {
        id: 14,
        name: "Tablet Stand",
        description: "Adjustable aluminum tablet stand for comfortable viewing angles, universal compatibility.",
        price: "$34.99",
        img: "assets/images/product2.jpg",
        category: "Accessories"
    },
    {
        id: 15,
        name: "Smart Home Hub",
        description: "Central control hub for all your smart home devices with voice assistant integration.",
        price: "$99.99",
        img: "assets/images/product3.jpg",
        category: "Smart Home"
    },
    {
        id: 16,
        name: "Portable Monitor",
        description: "15.6-inch portable USB-C monitor, perfect for laptop dual-screen setup on the go.",
        price: "$199.99",
        img: "assets/images/product1.jpg",
        category: "Electronics"
    },
    {
        id: 17,
        name: "Cable Management Kit",
        description: "Complete cable organizer set with clips, sleeves, and ties for a clutter-free workspace.",
        price: "$19.99",
        img: "assets/images/product2.jpg",
        category: "Accessories"
    },
    {
        id: 18,
        name: "Desk Lamp LED",
        description: "Adjustable LED desk lamp with touch control, multiple brightness levels, and USB charging port.",
        price: "$44.99",
        img: "assets/images/product3.jpg",
        category: "Office"
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

// Get paginated products
function getPaginatedProducts(page = 1, productsPerPage = 12) {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
}

// Get total pages for products
function getTotalProductPages(productsPerPage = 12) {
    return Math.ceil(products.length / productsPerPage);
}

// ========================================
// PRODUCT PAGE FUNCTIONS
// ========================================

// Current page state
let currentProductPage = 1;
const productsPerPage = 12;

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

// Create product pagination HTML
function createProductPagination(currentPage, totalPages) {
    let html = '<div class="pagination" style="display: flex; justify-content: center; gap: 10px; margin-top: 30px; flex-wrap: wrap;">';
    
    // Previous button
    if (currentPage > 1) {
        html += `<button onclick="goToProductPage(${currentPage - 1})" style="padding: 10px 15px; background-color: #333; color: white; border: none; cursor: pointer;">← Previous</button>`;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage;
        const bgColor = isActive ? '#555' : '#333';
        html += `<button onclick="goToProductPage(${i})" style="padding: 10px 15px; background-color: ${bgColor}; color: white; border: none; cursor: pointer;">${i}</button>`;
    }
    
    // Next button
    if (currentPage < totalPages) {
        html += `<button onclick="goToProductPage(${currentPage + 1})" style="padding: 10px 15px; background-color: #333; color: white; border: none; cursor: pointer;">Next →</button>`;
    }
    
    html += '</div>';
    return html;
}

// Load product cards for specific page
function loadProductCards(page = 1) {
    const main = document.querySelector('main');
    if (!main) return;
    
    if (!products || products.length === 0) {
        main.innerHTML = '<article><h2>No products available</h2><p>Check back soon for new products!</p></article>';
        return;
    }
    
    currentProductPage = page;
    main.innerHTML = ''; // Clear existing content
    
    // Get products for current page
    const paginatedProducts = getPaginatedProducts(currentProductPage, productsPerPage);
    
    // Add each product
    paginatedProducts.forEach(product => {
        const article = document.createElement('article');
        article.innerHTML = createProductCard(product);
        main.appendChild(article);
    });
    
    // Add pagination
    const totalPages = getTotalProductPages(productsPerPage);
    if (totalPages > 1) {
        const paginationDiv = document.createElement('div');
        paginationDiv.innerHTML = createProductPagination(currentProductPage, totalPages);
        main.appendChild(paginationDiv);
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigate to specific product page
function goToProductPage(page) {
    loadProductCards(page);
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
