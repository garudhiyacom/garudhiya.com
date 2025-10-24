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
            <p>Combine these three powerhouses, and you have a drink that fuels performance while honoring the island's natural bounty.</p>
        `
    },
    {
        id: 2,
        title: "The History of Garudhiya Soup in the Maldives",
        excerpt: "A deep dive into the centuries-old tradition of the beloved fish soup.",
        img: "https://images.unsplash.com/photo-1562967916-eb82221dfb36?auto=format&fit=crop&w=800&q=80",
        date: "2025-02-05",
        author: "Mohan Raza",
        content: `
            <p>Garudhiya, a clear fish broth, has been a staple of Maldivian cuisine for generations. Traditionally prepared with freshly caught tuna, the soup reflects the islands' reliance on the sea.</p>
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
            <p>Kelp isn't just for soups. Here are five quick ideas:</p>
            <ul>
                <li><strong>Smoothie Boost:</strong> Blend a teaspoon of dried kelp powder into fruit smoothies for extra minerals.</li>
                <li><strong>Salad Dressing:</strong> Whisk kelp flakes into vinaigrette for a salty umami punch.</li>
                <li><strong>Stir-Fry:</strong> Toss rehydrated kelp strips with vegetables for a sea-flavored side.</li>
                <li><strong>Soup Thickener:</strong> Grind kelp into a fine powder and stir into creamy soups for texture.</li>
                <li><strong>Snack Seasoning:</strong> Sprinkle toasted kelp flakes over popcorn or roasted nuts.</li>
            </ul>
        `
    },
    {
        id: 4,
        title: "Sustainable Fishing Practices in the Maldives",
        excerpt: "How local fisheries protect reefs while providing fresh fish for Garudhiya soup.",
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        date: "2025-04-02",
        author: "Ahmed Zahir",
        content: `
            <p>The Maldives has embraced sustainable fishing practices that balance ecological preservation with traditional livelihoods. Pole-and-line fishing remains the preferred method for catching tuna, minimizing bycatch and reef damage.</p>
            <h3>Community-Led Conservation</h3>
            <p>Local fishing communities have established marine protected areas where breeding populations can thrive. These zones rotate seasonally, ensuring fish stocks remain healthy year-round.</p>
            <h3>From Sea to Soup</h3>
            <p>This sustainable approach means every can of Garudhiya Energy Drink and every bowl of traditional soup comes from responsibly sourced fish, supporting both ocean health and island economies.</p>
        `
    },
    {
        id: 5,
        title: "Morning Rituals: Pairing Garudhiya Energy Drink with Yoga",
        excerpt: "Boost your sunrise flow with the perfect beverage.",
        img: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80",
        date: "2025-04-22",
        author: "Nadia Patel",
        content: `
            <p>Starting your day with yoga and the right fuel can transform your entire morning. Garudhiya Energy Drink provides sustained energy without the jitters, making it ideal for pre-practice hydration.</p>
            <h3>Pre-Practice Protocol</h3>
            <p>Sip half a can 20 minutes before your flow. The natural electrolytes from coconut water help prevent cramping during challenging poses, while kelp's minerals support muscle function.</p>
            <h3>Post-Practice Recovery</h3>
            <p>Finish the rest after savasana. The gentle caffeine boost from curry leaves enhances mental clarity for meditation or journaling, completing your mindful morning routine.</p>
        `
    },
    {
        id: 6,
        title: "How to Make the Perfect Garudhiya Soup at Home",
        excerpt: "Step-by-step guide to recreating the classic Maldivian broth.",
        img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
        date: "2025-05-10",
        author: "Rashid Ali",
        content: `
            <p>Making authentic Garudhiya soup requires only a few ingredients, but technique matters. Here's how to nail it every time.</p>
            <h3>Ingredients</h3>
            <ul>
                <li>2 lbs fresh tuna, cut into chunks</li>
                <li>6 cups water</li>
                <li>1 onion, sliced</li>
                <li>3 curry leaves</li>
                <li>1 small piece pandan leaf (optional)</li>
                <li>Lime and chili to serve</li>
            </ul>
            <h3>Method</h3>
            <p>Bring water to boil, add tuna and simmer for 15 minutes. Add onion and curry leaves, simmer 10 more minutes. Remove fish, strain broth. Serve clear broth with lime wedges, chili, and rice on the side. The fish can be flaked and eaten separately with the broth.</p>
        `
    },
    {
        id: 7,
        title: "The Science Behind Natural Caffeine in Green Tea",
        excerpt: "Why our energy drink feels smoother than coffee.",
        img: "https://images.unsplash.com/photo-1514516870922-0d5e2c5e5c40?auto=format&fit=crop&w=800&q=80",
        date: "2025-05-28",
        author: "Leila Khan",
        content: `
            <p>While coffee delivers a quick caffeine spike, the natural caffeine in curry leaves and green tea extract provides a gentler, sustained release. Here's the science.</p>
            <h3>L-Theanine Balance</h3>
            <p>Green tea contains L-theanine, an amino acid that promotes calm focus. This compound works synergistically with caffeine to prevent jitters and crashes, giving you smooth energy that lasts.</p>
            <h3>Curry Leaf Compounds</h3>
            <p>Curry leaves contribute trace amounts of natural stimulants along with antioxidants that support metabolism. Combined with kelp's iodine, you get energy that feels clean and sustainable rather than anxious.</p>
        `
    },
    {
        id: 8,
        title: "Top 5 Beaches Near Malé",
        excerpt: "Plan your island getaway while sipping Garudhiya Energy.",
        img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        date: "2025-06-14",
        author: "Tomás Silva",
        content: `
            <p>Whether you're a local or visiting, these beaches near Malé offer the perfect escape without the long journey.</p>
            <h3>1. Artificial Beach (Malé)</h3>
            <p>The most accessible option, perfect for sunset views and people-watching.</p>
            <h3>2. Hulhumalé Beach</h3>
            <p>Wide, clean, and great for swimming. Just 15 minutes from the capital.</p>
            <h3>3. Villingili Beach</h3>
            <p>A quick ferry ride away, offering quieter shores and local cafes.</p>
            <h3>4. Guraidhoo Beach</h3>
            <p>Excellent for snorkeling and experiencing authentic island life.</p>
            <h3>5. Dhiffushi Beach</h3>
            <p>Crystal-clear waters and pristine sand, worth the speedboat trip.</p>
        `
    },
    {
        id: 9,
        title: "DIY Coconut-Infused Water Bottles",
        excerpt: "Turn ordinary bottles into refreshing island-style hydration.",
        img: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=80",
        date: "2025-07-01",
        author: "Emily Wu",
        content: `
            <p>Create your own tropical hydration station at home with these simple infusion recipes.</p>
            <h3>Classic Coconut Lime</h3>
            <p>Add coconut water, fresh lime slices, and mint to filtered water. Refrigerate overnight for maximum flavor.</p>
            <h3>Pineapple Coconut</h3>
            <p>Combine coconut water with fresh pineapple chunks and a splash of vanilla extract for a dessert-like refreshment.</p>
            <h3>Tropical Green</h3>
            <p>Mix coconut water with cucumber slices and basil for a spa-worthy hydrator that's both calming and energizing.</p>
            <p>Pro tip: Use glass bottles to prevent plastic taste and keep flavors pure!</p>
        `
    },
    {
        id: 10,
        title: "Behind the Scenes: Crafting Garudhiya Energy Drink",
        excerpt: "A look at the production process from kelp harvest to bottling.",
        img: "https://images.unsplash.com/photo-1556912995-5a1c5f1b6c43?auto=format&fit=crop&w=800&q=80",
        date: "2025-07-15",
        author: "Jenna Ortiz",
        content: `
            <p>Ever wondered how we transform traditional island ingredients into a modern energy drink? Here's an exclusive look at our process.</p>
            <h3>Kelp Harvesting</h3>
            <p>We partner with sustainable kelp farms in the North Atolls, where seaweed is hand-harvested at peak nutrient density. The kelp is dried within hours to preserve its mineral content.</p>
            <h3>Coconut Water Extraction</h3>
            <p>Young coconuts are sourced from local growers and processed the same day. We use a cold-press method to maintain natural electrolyte balance.</p>
            <h3>Flavor Infusion</h3>
            <p>Curry leaves and tropical fruit essences are carefully blended to create our signature taste. Each batch is tested for flavor consistency and nutritional content.</p>
            <h3>Quality Control</h3>
            <p>Before bottling, every batch undergoes rigorous testing for purity, pH balance, and mineral content. We're committed to delivering the same quality in every can.</p>
        `
    }
];
