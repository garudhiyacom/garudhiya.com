// ========================================
// BLOG POSTS DATA
// ========================================

const posts = [
    {
        id: 1,
        title: "Sample Blog Post",
        excerpt: "This is a short excerpt of the blog post",
        img: "assets/images/post1.jpg",
        date: "2025-10-28",
        author: "John Doe",
        content: "This is the full content of the blog post. It can contain multiple paragraphs and detailed information about the topic."
    },
    {
        id: 2,
        title: "Getting Started with Web Development",
        excerpt: "Learn the basics of HTML, CSS, and JavaScript to kickstart your web development journey.",
        img: "assets/images/post2.jpg",
        date: "2025-10-27",
        author: "Jane Smith",
        content: "Web development is an exciting field that combines creativity with technical skills. In this guide, we'll explore the fundamental technologies that power the modern web: HTML for structure, CSS for styling, and JavaScript for interactivity. Whether you're a complete beginner or looking to refresh your skills, this post will provide you with a solid foundation to build upon."
    },
    {
        id: 3,
        title: "10 Tips for Better Productivity",
        excerpt: "Discover practical strategies to boost your productivity and achieve more in less time.",
        img: "assets/images/post3.jpg",
        date: "2025-10-26",
        author: "Mike Johnson",
        content: "Productivity isn't about working harder—it's about working smarter. In this article, we share ten proven techniques that can help you maximize your efficiency, from time-blocking and the Pomodoro Technique to eliminating distractions and prioritizing tasks. Implement these strategies and watch your productivity soar while maintaining a healthy work-life balance."
    },
    {
        id: 4,
        title: "The Future of Artificial Intelligence",
        excerpt: "Exploring the potential and challenges of AI technology in the coming decade.",
        img: "assets/images/post1.jpg",
        date: "2025-10-25",
        author: "Sarah Williams",
        content: "Artificial Intelligence is reshaping our world at an unprecedented pace. From healthcare to transportation, AI is revolutionizing industries and creating new possibilities we never imagined. This article explores the current state of AI technology and what we can expect in the future."
    },
    {
        id: 5,
        title: "Healthy Eating Made Simple",
        excerpt: "Practical tips for maintaining a balanced diet without complicated meal plans.",
        img: "assets/images/post2.jpg",
        date: "2025-10-24",
        author: "Emily Chen",
        content: "Eating healthy doesn't have to be complicated or expensive. With a few simple strategies and smart choices, you can nourish your body and feel great. Learn about portion control, meal prep basics, and how to make nutritious choices that fit your lifestyle."
    },
    {
        id: 6,
        title: "Remote Work Best Practices",
        excerpt: "How to stay productive and maintain work-life balance while working from home.",
        img: "assets/images/post3.jpg",
        date: "2025-10-23",
        author: "David Martinez",
        content: "Remote work has become the new normal for many professionals. This comprehensive guide covers everything from setting up an efficient home office to managing your time effectively and staying connected with your team. Discover the tools and techniques that successful remote workers use daily."
    },
    {
        id: 7,
        title: "Digital Marketing Trends 2025",
        excerpt: "Stay ahead of the curve with the latest digital marketing strategies and tools.",
        img: "assets/images/post1.jpg",
        date: "2025-10-22",
        author: "Lisa Anderson",
        content: "The digital marketing landscape is constantly evolving. This year brings new opportunities in social media, content marketing, and AI-powered advertising. Learn about the trends that are shaping the industry and how you can leverage them for your business success."
    },
    {
        id: 8,
        title: "Photography Tips for Beginners",
        excerpt: "Master the basics of photography and start taking stunning photos today.",
        img: "assets/images/post2.jpg",
        date: "2025-10-21",
        author: "Tom Brown",
        content: "Photography is an art form that anyone can learn. This beginner's guide covers essential concepts like composition, lighting, and camera settings. Whether you're using a smartphone or a DSLR, these tips will help you capture beautiful moments and improve your photography skills."
    },
    {
        id: 9,
        title: "Sustainable Living Guide",
        excerpt: "Simple changes you can make today to live a more environmentally friendly lifestyle.",
        img: "assets/images/post3.jpg",
        date: "2025-10-20",
        author: "Rachel Green",
        content: "Living sustainably is easier than you think. From reducing plastic waste to conserving energy, small actions can make a big difference. This guide provides practical tips for making your daily life more eco-friendly without sacrificing comfort or convenience."
    },
    {
        id: 10,
        title: "Financial Planning Basics",
        excerpt: "Essential strategies for managing your money and building wealth over time.",
        img: "assets/images/post1.jpg",
        date: "2025-10-19",
        author: "James Wilson",
        content: "Financial literacy is crucial for long-term success. This article covers fundamental concepts like budgeting, saving, investing, and debt management. Learn how to take control of your finances and work towards your financial goals with confidence."
    },
    {
        id: 11,
        title: "Travel Hacks for Budget Travelers",
        excerpt: "Explore the world without breaking the bank with these money-saving travel tips.",
        img: "assets/images/post2.jpg",
        date: "2025-10-18",
        author: "Maria Garcia",
        content: "Traveling doesn't have to be expensive. With smart planning and insider knowledge, you can experience amazing destinations on a budget. Discover how to find cheap flights, affordable accommodations, and free activities that make your travel dreams a reality."
    },
    {
        id: 12,
        title: "Mindfulness and Mental Health",
        excerpt: "Techniques for reducing stress and improving your overall mental wellbeing.",
        img: "assets/images/post3.jpg",
        date: "2025-10-17",
        author: "Dr. Alex Thompson",
        content: "Mental health is just as important as physical health. This comprehensive guide explores mindfulness practices, meditation techniques, and stress management strategies that can improve your quality of life. Learn how to cultivate inner peace and resilience in today's fast-paced world."
    },
    {
        id: 13,
        title: "Home Gardening for Beginners",
        excerpt: "Start your own garden and enjoy fresh, homegrown produce all year round.",
        img: "assets/images/post1.jpg",
        date: "2025-10-16",
        author: "Patricia Miller",
        content: "Growing your own food is rewarding and sustainable. This beginner's guide covers everything from choosing the right plants to soil preparation and pest management. Whether you have a large backyard or just a small balcony, you can start your gardening journey today."
    },
    {
        id: 14,
        title: "Cybersecurity Essentials",
        excerpt: "Protect yourself online with these crucial security tips and best practices.",
        img: "assets/images/post2.jpg",
        date: "2025-10-15",
        author: "Robert Davis",
        content: "In our connected world, cybersecurity is more important than ever. Learn how to protect your personal information, create strong passwords, recognize phishing attempts, and secure your devices. These essential practices will help keep you safe online."
    },
    {
        id: 15,
        title: "The Art of Public Speaking",
        excerpt: "Overcome your fear and become a confident, engaging public speaker.",
        img: "assets/images/post3.jpg",
        date: "2025-10-14",
        author: "Amanda Taylor",
        content: "Public speaking is a valuable skill that can advance your career and personal life. This guide provides practical techniques for preparing presentations, managing anxiety, engaging your audience, and delivering memorable speeches that inspire and inform."
    }
];

// ========================================
// BLOG UTILITY FUNCTIONS
// ========================================

// Get post by ID
function getPostById(id) {
    return posts.find(post => post.id === parseInt(id));
}

// Get latest post
function getLatestPost() {
    return posts.length > 0 ? posts[posts.length - 1] : null;
}

// Get random posts
function getRandomPosts(count = 4) {
    const shuffled = [...posts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, posts.length));
}

// Get paginated posts
function getPaginatedPosts(page = 1, postsPerPage = 12) {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return posts.slice(startIndex, endIndex);
}

// Get total pages
function getTotalPages(postsPerPage = 12) {
    return Math.ceil(posts.length / postsPerPage);
}
