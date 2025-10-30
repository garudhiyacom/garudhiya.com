// Products data with full details
const products = [
    {
        id: 1,
        name: "Premium Product 1",
        price: "$99.99",
        category: "Electronics",
        dateAdded: "October 25, 2025",
        excerpt: "High-quality premium product with excellent features and performance.",
        image: "assets/images/garudhiya-energy-drink.png",
        imageDetail: "assets/images/garudhiya-energy-drink.png",
        description: `
            <p>This premium product offers exceptional quality and performance. Built with the finest materials and cutting-edge technology, it's designed to meet all your needs.</p>
            
            <h3>Key Features</h3>
            <ul>
                <li>Premium quality construction</li>
                <li>Advanced technology integration</li>
                <li>Long-lasting durability</li>
                <li>User-friendly design</li>
                <li>Excellent value for money</li>
            </ul>
            
            <h3>Specifications</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            
            <h3>What's Included</h3>
            <ul>
                <li>Main product unit</li>
                <li>User manual</li>
                <li>Warranty card</li>
                <li>Accessories pack</li>
            </ul>
        `
    },
    {
        id: 2,
        name: "Deluxe Product 2",
        price: "$149.99",
        category: "Home & Garden",
        dateAdded: "October 20, 2025",
        excerpt: "Deluxe edition with enhanced features for the discerning customer.",
        image: "assets/images/garudhiya-energy-drink.png",
        imageDetail: "assets/images/garudhiya-energy-drink.png",
        description: `
            <p>Experience luxury with our deluxe edition. Meticulously crafted to provide superior performance and aesthetic appeal.</p>
            
            <h3>Features</h3>
            <ul>
                <li>Deluxe finish and design</li>
                <li>Enhanced functionality</li>
                <li>Premium materials</li>
                <li>Extended warranty</li>
            </ul>
            
            <h3>Why Choose This?</h3>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        `
    },
    {
        id: 3,
        name: "Essential Product 3",
        price: "$49.99",
        category: "Accessories",
        dateAdded: "October 15, 2025",
        excerpt: "Essential everyday product that combines quality with affordability.",
        image: "assets/images/garudhiya-energy-drink.png",
        imageDetail: "assets/images/garudhiya-energy-drink.png",
        description: `
            <p>Get the essentials without compromising on quality. Perfect for everyday use and built to last.</p>
            
            <h3>Benefits</h3>
            <ul>
                <li>Affordable pricing</li>
                <li>Reliable performance</li>
                <li>Compact and portable</li>
                <li>Easy to maintain</li>
            </ul>
            
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        `
    },
    {
        id: 4,
        name: "Professional Product 4",
        price: "$299.99",
        category: "Electronics",
        dateAdded: "October 10, 2025",
        excerpt: "Professional-grade product designed for serious users and enthusiasts.",
        image: "assets/images/garudhiya-energy-drink.png",
        imageDetail: "assets/images/garudhiya-energy-drink.png",
        description: `
            <p>Designed for professionals who demand the best. This product delivers exceptional performance in the most demanding situations.</p>
            
            <h3>Professional Features</h3>
            <ul>
                <li>Industrial-grade components</li>
                <li>Advanced control systems</li>
                <li>Maximum durability</li>
                <li>Professional support</li>
            </ul>
            
            <h3>Performance</h3>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        `
    },
    {
        id: 5,
        name: "Compact Product 5",
        price: "$79.99",
        category: "Accessories",
        dateAdded: "October 5, 2025",
        excerpt: "Compact design that doesn't sacrifice functionality or quality.",
        image: "assets/images/garudhiya-energy-drink.png",
        imageDetail: "assets/images/garudhiya-energy-drink.png",
        description: `
            <p>Perfect for those who value space efficiency without compromising on features. This compact solution fits anywhere.</p>
            
            <h3>Compact Features</h3>
            <ul>
                <li>Space-saving design</li>
                <li>Portable and lightweight</li>
                <li>Full functionality</li>
                <li>Modern aesthetic</li>
            </ul>
            
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
        `
    },
    {
        id: 6,
        name: "Ultimate Product 6",
        price: "$399.99",
        category: "Premium",
        dateAdded: "September 30, 2025",
        excerpt: "The ultimate choice for those who want the absolute best available.",
        image: "assets/images/garudhiya-energy-drink.png",
        imageDetail: "assets/images/garudhiya-energy-drink.png",
        description: `
            <p>Our flagship product representing the pinnacle of design, engineering, and craftsmanship.</p>
            
            <h3>Ultimate Features</h3>
            <ul>
                <li>Top-of-the-line components</li>
                <li>Cutting-edge technology</li>
                <li>Lifetime warranty</li>
                <li>VIP customer support</li>
                <li>Exclusive design</li>
            </ul>
            
            <h3>Why It's The Best</h3>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.</p>
        `
    },
    {
        id: 7,
        name: "Standard Product 7",
        price: "$59.99",
        category: "Home & Garden",
        dateAdded: "September 25, 2025",
        excerpt: "Reliable standard product that meets all your basic requirements.",
        image: "assets/images/garudhiya-energy-drink.png",
        imageDetail: "assets/images/garudhiya-energy-drink.png",
        description: `
            <p>A dependable choice that delivers consistent performance day after day. Great value for money.</p>
            
            <h3>Standard Features</h3>
            <ul>
                <li>Reliable construction</li>
                <li>Easy to use</li>
                <li>Good warranty coverage</li>
                <li>Wide availability</li>
            </ul>
            
            <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
        `
    },
    {
        id: 8,
        name: "Smart Product 8",
        price: "$199.99",
        category: "Electronics",
        dateAdded: "September 20, 2025",
        excerpt: "Smart technology integrated for modern living and convenience.",
        image: "assets/images/garudhiya-energy-drink.png",
        imageDetail: "assets/images/garudhiya-energy-drink.png",
        description: `
            <p>Embrace the smart revolution with this intelligent product that adapts to your lifestyle.</p>
            
            <h3>Smart Features</h3>
            <ul>
                <li>WiFi connectivity</li>
                <li>App control</li>
                <li>Voice assistant compatible</li>
                <li>Automated functions</li>
                <li>Energy efficient</li>
            </ul>
            
            <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p>
        `
    },
    {
        id: 9,
        name: "Eco Product 9",
        price: "$89.99",
        category: "Premium",
        dateAdded: "September 15, 2025",
        excerpt: "Environmentally friendly product made with sustainable materials.",
        image: "assets/images/garudhiya-energy-drink.png",
        imageDetail: "assets/images/garudhiya-energy-drink.png",
        description: `
            <p>Make a positive impact with this eco-friendly choice. Sustainable, responsible, and high-quality.</p>
            
            <h3>Eco Features</h3>
            <ul>
                <li>Recycled materials</li>
                <li>Carbon neutral production</li>
                <li>Biodegradable packaging</li>
                <li>Energy efficient operation</li>
                <li>Sustainable sourcing</li>
            </ul>
            
            <h3>Environmental Impact</h3>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque.</p>
        `
    }
];
