// Get products from Firebase
async function getProducts() {
    try {
        const products = await getProductsFromFirebase();
        return products;
    } catch (error) {
        console.error('Error loading products:', error);
        return [];
    }
}

// Legacy function for compatibility
function getProductsSync() {
    const stored = localStorage.getItem('products');
    if (stored) {
        return JSON.parse(stored);
    }
    
    // Default products if none in storage
    const defaultProducts = [
        { id: 1, name: 'Premium Headphones', description: 'High-quality wireless headphones with noise cancellation.', price: '$129.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%234f46e5" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EHeadphones%3C/text%3E%3C/svg%3E' },
        { id: 2, name: 'Smart Watch', description: 'Track your fitness and stay connected on the go.', price: '$199.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2310b981" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3ESmart Watch%3C/text%3E%3C/svg%3E' },
        { id: 3, name: 'Laptop Stand', description: 'Ergonomic aluminum stand for better posture.', price: '$49.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f59e0b" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3ELaptop Stand%3C/text%3E%3C/svg%3E' },
        { id: 4, name: 'Wireless Mouse', description: 'Precision wireless mouse with long battery life.', price: '$34.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ec4899" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EWireless Mouse%3C/text%3E%3C/svg%3E' },
        { id: 5, name: 'USB-C Hub', description: 'Multi-port hub for all your connectivity needs.', price: '$44.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%238b5cf6" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EUSB-C Hub%3C/text%3E%3C/svg%3E' },
        { id: 6, name: 'Desk Lamp', description: 'LED desk lamp with adjustable brightness and color.', price: '$54.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2306b6d4" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EDesk Lamp%3C/text%3E%3C/svg%3E' },
        { id: 7, name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard with tactile switches.', price: '$89.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ef4444" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EKeyboard%3C/text%3E%3C/svg%3E' },
        { id: 8, name: 'Webcam HD', description: 'Crystal clear 1080p webcam for video calls.', price: '$69.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2314b8a6" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EWebcam%3C/text%3E%3C/svg%3E' },
        { id: 9, name: 'Phone Holder', description: 'Adjustable phone holder for desk or car.', price: '$19.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f97316" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EPhone Holder%3C/text%3E%3C/svg%3E' },
        { id: 10, name: 'Portable Charger', description: '20000mAh power bank for all your devices.', price: '$39.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%236366f1" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EPower Bank%3C/text%3E%3C/svg%3E' },
        { id: 11, name: 'Bluetooth Speaker', description: 'Portable speaker with amazing sound quality.', price: '$79.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23a855f7" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3ESpeaker%3C/text%3E%3C/svg%3E' },
        { id: 12, name: 'Cable Organizer', description: 'Keep your cables neat and organized.', price: '$14.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2322c55e" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EOrganizer%3C/text%3E%3C/svg%3E' },
        { id: 13, name: 'Monitor Riser', description: 'Wooden monitor stand with storage space.', price: '$59.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23eab308" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EMonitor Riser%3C/text%3E%3C/svg%3E' },
        { id: 14, name: 'Laptop Sleeve', description: 'Protective sleeve for 13-15 inch laptops.', price: '$24.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f43f5e" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3ELaptop Sleeve%3C/text%3E%3C/svg%3E' },
        { id: 15, name: 'Screen Cleaner Kit', description: 'Professional cleaning kit for all screens.', price: '$12.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2306b6d4" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3ECleaner Kit%3C/text%3E%3C/svg%3E' },
        { id: 16, name: 'Ergonomic Chair Cushion', description: 'Memory foam cushion for better comfort.', price: '$34.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ec4899" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3ECushion%3C/text%3E%3C/svg%3E' },
        { id: 17, name: 'Desk Mat', description: 'Large desk mat with smooth surface.', price: '$29.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%234f46e5" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EDesk Mat%3C/text%3E%3C/svg%3E' },
        { id: 18, name: 'Wrist Rest', description: 'Gel wrist rest for keyboard and mouse.', price: '$18.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2310b981" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EWrist Rest%3C/text%3E%3C/svg%3E' },
        { id: 19, name: 'Tablet Stand', description: 'Adjustable stand for tablets and e-readers.', price: '$24.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23fb923c" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3ETablet Stand%3C/text%3E%3C/svg%3E' },
        { id: 20, name: 'Noise Cancelling Earbuds', description: 'True wireless earbuds with active noise cancellation.', price: '$149.99', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23c026d3" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="white"%3EEarbuds%3C/text%3E%3C/svg%3E' }
    ];
    
    // Save defaults to localStorage
    localStorage.setItem('products', JSON.stringify(defaultProducts));
    return defaultProducts;
}

// Pagination settings
const PRODUCTS_PER_PAGE = 9;
let currentPage = 1;
let searchQuery = '';

// Filter products by search query
function filterProducts(products) {
    // First filter out hidden products
    let visibleProducts = products.filter(product => !product.hidden);
    
    if (!searchQuery) return visibleProducts;
    
    const query = searchQuery.toLowerCase();
    return visibleProducts.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.price.toLowerCase().includes(query)
    );
}

// Render products for current page
async function renderProducts(page = 1) {
    const productGrid = document.getElementById('product-grid');
    let products = await getProducts();
    
    // Apply search filter
    products = filterProducts(products);
    
    if (products.length === 0) {
        productGrid.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 3rem;">No products found.</p>';
        document.querySelector('.pagination').innerHTML = '';
        return;
    }
    
    // Calculate pagination
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const productsToShow = products.slice(startIndex, endIndex);
    
    // Clear grid
    productsGrid.innerHTML = '';
    
    // Render products for current page
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy" style="width: 100%; height: 200px; object-fit: cover;">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">${product.price}</div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    
    // Render pagination
    renderProductsPagination(page, totalPages);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render pagination controls
function renderProductsPagination(currentPage, totalPages) {
    const paginationContainer = document.querySelector('.pagination');
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '<div class="pagination-controls">';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentPage - 1})">← Previous</button>`;
    }
    
    // Page numbers
    paginationHTML += '<div class="pagination-numbers">';
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `<button class="pagination-btn active">${i}</button>`;
        } else {
            paginationHTML += `<button class="pagination-btn" onclick="changePage(${i})">${i}</button>`;
        }
    }
    paginationHTML += '</div>';
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentPage + 1})">Next →</button>`;
    }
    
    paginationHTML += '</div>';
    paginationContainer.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    currentPage = page;
    renderProducts(page);
}

// Load Products
document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.getElementById('products-grid');
    
    if (productsGrid) {
        renderProducts(1);
        
        // Search functionality
        const searchInput = document.getElementById('product-search');
        const clearBtn = document.getElementById('clear-search');
        
        searchInput.addEventListener('input', function(e) {
            searchQuery = e.target.value.trim();
            currentPage = 1;
            renderProducts(1);
            
            // Show/hide clear button
            clearBtn.style.display = searchQuery ? 'block' : 'none';
        });
        
        clearBtn.addEventListener('click', function() {
            searchInput.value = '';
            searchQuery = '';
            currentPage = 1;
            renderProducts(1);
            clearBtn.style.display = 'none';
        });
    }
});

// Make changePage globally accessible
window.changePage = changePage;
