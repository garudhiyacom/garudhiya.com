const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation and superior sound quality.",
        price: "$199.99",
        img: "assets/images/garudhiya-energy-drink.png",
        category: "Electronics"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        description: "Track your health and fitness goals with this advanced smartwatch featuring heart rate monitoring.",
        price: "$149.99",
        img: "assets/images/garudhiya-energy-drink.png",
        category: "Wearables"
    },
    {
        id: 3,
        name: "Portable Bluetooth Speaker",
        description: "Compact and powerful speaker with 12-hour battery life and waterproof design.",
        price: "$79.99",
        img: "assets/images/garudhiya-energy-drink.png",
        category: "Audio"
    },
    {
        id: 4,
        name: "Laptoper Stand",
        description: "Ergonomic aluminum laptop stand for improved posture and comfort during work.",
        price: "$49.99",
        img: "assets/images/garudhiya-energy-drink.png",
        category: "Accessories"
    },
    {
        id: 5,
        name: "Wireless Keyboard & Mouse",
        description: "Sleek wireless keyboard and mouse combo with long battery life and comfortable typing experience.",
        price: "$89.99",
        img: "assets/images/garudhiya-energy-drink.png",
        category: "Accessories"
    },
    {
        id: 6,
        name: "4K Webcam",
        description: "Professional-grade 4K webcam with auto-focus and built-in microphone for crystal-clear video calls.",
        price: "$129.99",
        img: "assets/images/garudhiya-energy-drink.png",
        category: "Electronics"
    }
];

function loadProductCards() {
    const main = document.querySelector('main');
    
    if (products && products.length > 0) {
        // Create a container for the product grid
        const productGrid = document.createElement('div');
        productGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px;';
        
        products.forEach(product => {
            const article = document.createElement('article');
            article.style.cssText = 'display: flex; flex-direction: column; height: 100%;';
            article.innerHTML = `
                <img src="${product.img}" alt="${product.name}" onerror="this.src='assets/images/placeholder.jpg'" style="width: 100%; height: 250px; object-fit: cover;">
                <div style="flex: 1; display: flex; flex-direction: column;">
                    <span style="display: inline-block; background-color: #667eea; color: white; padding: 5px 12px; border-radius: 15px; font-size: 12px; font-weight: 500; width: fit-content; margin-bottom: 10px;">${product.category}</span>
                    <h2 style="font-size: 1.4em; margin-bottom: 10px;">${product.name}</h2>
                    <p style="flex: 1;">${product.description}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
                        <span style="font-size: 1.5em; font-weight: bold; color: #667eea;">${product.price}</span>
                    </div>
                </div>
            `;
            productGrid.appendChild(article);
        });
        
        main.innerHTML = '<h2 style="color: #667eea; margin-bottom: 30px; font-size: 2em;">Our Products</h2>';
        main.appendChild(productGrid);
    } else {
        main.innerHTML = '<article><h2>No products available</h2><p>Check back soon for new products!</p></article>';
    }
}

if (window.location.pathname.includes('products.html')) {
    window.addEventListener('DOMContentLoaded', loadProductCards);
}
