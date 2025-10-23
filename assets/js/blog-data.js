/* --------------------------------------------------------------
   BLOG DATA – shared between the list page and the detail page
   -------------------------------------------------------------- */
const BLOGS = [
    {
        id: 1,
        title: "Why Island Ingredients Make the Best Energy Drink",
        excerpt: "Discover how kelp, coconut water, and tropical fruits give Garudhiya Energy Drink its unique boost.",
        img: "https://images.unsplash.com/photo-1526401485004-2ea33f8c8c9b?auto=format&fit=crop&w=800&q=80",
        date: "2025-01-12",
        author: "Lina Ahmed",
        content: `
            <p>Island ingredients have been used for centuries to fuel the bodies of fishermen, surfers, and travelers. Today we harness that heritage in a modern, convenient can.</p>
            <h3>The Power of Kelp</h3>
            <p>Kelp is rich in iodine, iron, and trace minerals that support metabolism and thyroid health. Unlike synthetic additives, kelp delivers a clean, sustained energy release.</p>
            <h3>Coconut Water Hydration</h3>
            <p>Natural electrolytes from coconut water keep you hydrated without the sugary crash of many sports drinks.</p>
            <h3>Tropical Fruit Flavour</h3>
            <p>A splash of passion fruit and mango gives a bright, refreshing finish that reminds you of a beach sunrise.</p>
            <p>Combine these three powerhouses, and you have a drink that fuels performance while honoring the island’s natural bounty.</p>
        `
    },
    {
        id: 2,
        title: "The History of Garudhiya Soup in the Maldives",
        excerpt: "A deep dive into the centuries‑old tradition of the beloved fish soup.",
        img: "https://images.unsplash.com/photo-1562967916-eb82221dfb36?auto=format&fit=crop&w=800&q=80",
        date: "2025-02-05",
        author: "Mohan Raza",
        content: `
            <p>Garudhiya, a clear fish broth, has been a staple of Maldivian cuisine for generations. Traditionally prepared with freshly caught tuna, the soup reflects the islands’ reliance on the sea.</p>
            <p>Historically, families would gather at dawn to clean and fillet the fish, then simmer it with a handful of aromatic herbs. The simplicity of the broth highlights the quality of the fish itself.</p>
            <p>Today, modern kitchens preserve the same technique, but many chefs experiment with additional herbs like curry leaves or lemongrass to add a contemporary twist.</p>
        `
    },
    {
        id: 3,
        title: "5 Ways to Use Kelp in Everyday Cooking",
        excerpt: "From smoothies to sauces – kelp is a versatile superfood.",
        img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
        date: "2025-03-18",
        author: "Sara Lee",
        content: `
            <p>Kelp isn’t just for soups. Here are five quick ideas:</p>
            <ul>
                <li><strong>Smoothie Boost:</strong> Blend a teaspoon of dried kelp powder into fruit smoothies for extra minerals.</li>
                <li><strong>Salad Dressing:</strong> Whisk kelp flakes into vinaigrette for a salty umami punch.</li>
                <li><strong>Stir‑Fry:</strong> Toss rehydrated kelp strips with vegetables for a sea‑flavored side.</li>
                <li><strong>Soup Thickener:</strong> Grind kelp into a fine powder and stir into creamy soups for texture.</li>
                <li><strong>Snack Seasoning:</strong> Sprinkle toasted kelp flakes over popcorn or roasted nuts.</li>
            </ul>
        `
    },

    /* -----------------------------------------------------------------
       Add as many additional posts as you like – keep the same shape.
       ----------------------------------------------------------------- */
    {
        id: 4,
        title: "Sustainable Fishing Practices in the Maldives",
        excerpt: "How local fisheries protect reefs while providing fresh fish for Garudhiya soup.",
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        date: "2025-04-02",
        author: "Ahmed Zahir",
        content: `<p>…full article…</p>`
    },
    {
        id: 5,
        title: "Morning Rituals: Pairing Garudhiya Energy Drink with Yoga",
        excerpt: "Boost your sunrise flow with the perfect beverage.",
        img: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80",
        date: "2025-04-22",
        author: "Nadia Patel",
        content: `<p>…full article…</p>`
    },
    {
        id: 6,
        title: "How to Make the Perfect Garudhiya Soup at Home",
        excerpt: "Step‑by‑step guide to recreating the classic Maldivian broth.",
        img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
        date: "2025-05-10",
        author: "Rashid Ali",
        content: `<p>…full article…</p>`
    },
    {
        id: 7,
        title: "The Science Behind Natural Caffeine in Green Tea",
        excerpt: "Why our energy drink feels smoother than coffee.",
        img: "https://images.unsplash.com/photo-1514516870922-0d5e2c5e5c40?auto=format&fit=crop&w=800&q=80",
        date: "2025-05-28",
        author: "Leila Khan",
        content: `<p>…full article…</p>`
    },
    {
        id: 8,
        title: "Top 5 Beaches Near Malé",
        excerpt: "Plan your island getaway while sipping Garudhiya Energy.",
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        date: "2025-06-14",
        author: "Tomás Silva",
        content: `<p>…full article…</p>`
    },
    {
        id: 9,
        title: "DIY Coconut‑Infused Water Bottles",
        excerpt: "Turn ordinary bottles into refreshing island‑style hydration.",
        img: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=80",
        date: "2025-07-01",
        author: "Emily Wu",
        content: `<p>…full article…</p>`
    },

    /* -----------------------------------------------------------------
       Add more posts beyond 9 to see pagination in action.
       ----------------------------------------------------------------- */
    {
        id: 10,
        title: "Behind the Scenes: Crafting Garudhiya Energy Drink",
        excerpt: "A look at the production process from kelp harvest to bottling.",
        img: "https://images.unsplash.com/photo-1556912995-5a1c5f1b6c43?auto=format&fit=crop&w=800&q=80",
        date: "2025-07-15",
        author: "Jenna Ortiz",
        content: `<p>…full article…</p>`
    }
];
