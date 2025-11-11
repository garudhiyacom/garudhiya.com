// Cache for blog posts (1 hour with localStorage persistence)
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
const BLOG_CACHE_KEY = 'blogPostsCache_v1';
const BLOG_CACHE_TIME_KEY = 'blogPostsCacheTime_v1';

// Get blog posts from Firebase with persistent caching
async function getBlogPosts() {
    try {
        const now = Date.now();
        
        // Try to get from localStorage first
        const cachedData = localStorage.getItem(BLOG_CACHE_KEY);
        const cachedTime = localStorage.getItem(BLOG_CACHE_TIME_KEY);
        
        if (cachedData && cachedTime) {
            const cacheAge = now - parseInt(cachedTime);
            if (cacheAge < CACHE_DURATION) {
                console.log('📦 Using cached blog posts from localStorage (age: ' + Math.round(cacheAge/1000) + 's)');
                return JSON.parse(cachedData);
            }
        }
        
        console.log('🔄 Fetching fresh blog posts from Firebase');
        const posts = await getBlogPostsFromFirebase();
        
        // Save to localStorage
        try {
            localStorage.setItem(BLOG_CACHE_KEY, JSON.stringify(posts));
            localStorage.setItem(BLOG_CACHE_TIME_KEY, now.toString());
        } catch (e) {
            console.warn('Failed to cache to localStorage:', e);
        }
        
        return posts;
    } catch (error) {
        console.error('Error loading blog posts:', error);
        // Try to return stale cache if available
        const cachedData = localStorage.getItem(BLOG_CACHE_KEY);
        if (cachedData) {
            console.log('⚠️ Using stale cache due to error');
            return JSON.parse(cachedData);
        }
        return [];
    }
}

// Legacy function for compatibility
function getBlogPostsSync() {
    const stored = localStorage.getItem('blogPosts');
    if (stored) {
        return JSON.parse(stored);
    }
    
    // Default blog posts if none in storage
    const defaultPosts = [
        {
            id: 1,
            title: 'Getting Started with Garudhiya',
            excerpt: 'Learn about our journey and what makes Garudhiya special. Discover the story behind our brand and mission.',
            content: 'Welcome to Garudhiya! This is our first blog post.\n\nWe\'re excited to share our journey with you. Garudhiya represents more than just a brand - it\'s a commitment to quality, innovation, and meaningful connections.\n\nIn this blog, we\'ll share insights, updates, and stories that matter. Stay tuned for more!',
            date: 'November 9, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%236366f1" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3EGetting Started%3C/text%3E%3C/svg%3E'
        },
        {
            id: 2,
            title: 'Building Quality Products',
            excerpt: 'Our approach to creating products that matter. Quality over quantity, always.',
            content: 'Quality over quantity - that\'s our motto.\n\nEvery product we create goes through rigorous testing and refinement. We believe in creating things that last, that serve a real purpose, and that make people\'s lives better.\n\nOur process involves careful research, thoughtful design, and continuous improvement based on feedback.',
            date: 'November 8, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%2314b8a6" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3EQuality Products%3C/text%3E%3C/svg%3E'
        },
        {
            id: 3,
            title: 'The Power of Personal Branding',
            excerpt: 'Why personal branding matters in today\'s digital world and how to build yours effectively.',
            content: 'In today\'s connected world, your personal brand is your reputation.\n\nIt\'s how people perceive you, what they associate with your name, and the value you bring to the table. Building a strong personal brand takes time, consistency, and authenticity.\n\nBe genuine, be consistent, and always deliver value. That\'s the foundation of a strong personal brand.',
            date: 'November 7, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%23f59e0b" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3EPersonal Branding%3C/text%3E%3C/svg%3E'
        },
        {
            id: 4,
            title: 'Innovation and Creativity',
            excerpt: 'Exploring the intersection of innovation and creativity in product development.',
            content: 'Innovation isn\'t just about new technology - it\'s about solving problems in creative ways.\n\nWhen we combine innovation with creativity, we create solutions that are both functional and delightful. This intersection is where magic happens.\n\nStay curious, experiment often, and don\'t be afraid to fail. That\'s how breakthrough ideas are born.',
            date: 'November 6, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%23ec4899" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3EInnovation%3C/text%3E%3C/svg%3E'
        },
        {
            id: 5,
            title: 'Customer Success Stories',
            excerpt: 'Real stories from real customers who have benefited from our products and services.',
            content: 'Nothing makes us happier than seeing our customers succeed.\n\nToday, we\'re sharing some amazing stories from people who have used our products to achieve their goals. These testimonials inspire us to keep improving and innovating.\n\nThank you to everyone who has supported us on this journey!',
            date: 'November 5, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%238b5cf6" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3ESuccess Stories%3C/text%3E%3C/svg%3E'
        },
        {
            id: 6,
            title: 'Future of Digital Products',
            excerpt: 'What\'s next in the world of digital products? Our predictions and insights.',
            content: 'The digital landscape is evolving rapidly.\n\nWe\'re seeing trends toward more personalized experiences, AI integration, and sustainable practices. The future belongs to products that are not just functional, but also ethical and user-centric.\n\nWe\'re excited to be part of this evolution and to shape the future of digital products.',
            date: 'November 4, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%2306b6d4" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3EFuture%3C/text%3E%3C/svg%3E'
        },
        {
            id: 7,
            title: 'Productivity Tips for Remote Work',
            excerpt: 'Maximize your productivity while working from home with these proven strategies.',
            content: 'Remote work offers flexibility but requires discipline.\n\nCreate a dedicated workspace, set clear boundaries, and maintain a routine. Use productivity tools and take regular breaks to stay focused and avoid burnout.',
            date: 'November 3, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%23ef4444" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3EProductivity%3C/text%3E%3C/svg%3E'
        },
        {
            id: 8,
            title: 'Design Trends 2025',
            excerpt: 'Explore the latest design trends shaping the digital landscape this year.',
            content: 'Minimalism continues to dominate, but with bold accents.\n\nWe\'re seeing more 3D elements, immersive experiences, and sustainable design practices. The focus is on creating meaningful, accessible experiences for all users.',
            date: 'November 2, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%23a855f7" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3EDesign Trends%3C/text%3E%3C/svg%3E'
        },
        {
            id: 9,
            title: 'Building a Strong Team Culture',
            excerpt: 'How to foster collaboration and trust in your team.',
            content: 'Great teams are built on trust and communication.\n\nInvest in your people, celebrate wins together, and create an environment where everyone feels valued. Strong culture leads to better results and happier team members.',
            date: 'November 1, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%2322c55e" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3ETeam Culture%3C/text%3E%3C/svg%3E'
        },
        {
            id: 10,
            title: 'Mastering Time Management',
            excerpt: 'Practical techniques to make the most of your time.',
            content: 'Time is your most valuable resource.\n\nPrioritize tasks using the Eisenhower Matrix, batch similar activities, and learn to say no. Focus on what truly matters and delegate the rest.',
            date: 'October 31, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%23f59e0b" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3ETime Management%3C/text%3E%3C/svg%3E'
        },
        {
            id: 11,
            title: 'The Art of Storytelling',
            excerpt: 'Why every brand needs a compelling story.',
            content: 'Stories connect us emotionally.\n\nYour brand story should be authentic, relatable, and memorable. Share your journey, your values, and what makes you unique. People don\'t just buy products—they buy stories.',
            date: 'October 30, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%23ec4899" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3EStorytelling%3C/text%3E%3C/svg%3E'
        },
        {
            id: 12,
            title: 'Sustainable Business Practices',
            excerpt: 'How to build a business that\'s good for people and planet.',
            content: 'Sustainability isn\'t optional anymore.\n\nConsumers care about environmental impact. Implement eco-friendly practices, reduce waste, and be transparent about your efforts. Doing good is also good business.',
            date: 'October 29, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%2310b981" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3ESustainability%3C/text%3E%3C/svg%3E'
        },
        {
            id: 13,
            title: 'Social Media Strategy Guide',
            excerpt: 'Build an effective social media presence that drives results.',
            content: 'Social media is about connection, not just promotion.\n\nBe authentic, engage with your audience, and provide value. Consistency matters more than perfection. Show up regularly and build relationships.',
            date: 'October 28, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%234f46e5" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3ESocial Media%3C/text%3E%3C/svg%3E'
        },
        {
            id: 14,
            title: 'Learning from Failure',
            excerpt: 'Why failure is the best teacher and how to embrace it.',
            content: 'Every successful person has failed multiple times.\n\nFailure teaches resilience, creativity, and humility. Don\'t fear it—embrace it as part of the journey. Learn, adapt, and keep moving forward.',
            date: 'October 27, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%23f43f5e" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3ELearning%3C/text%3E%3C/svg%3E'
        },
        {
            id: 15,
            title: 'Content Marketing Essentials',
            excerpt: 'Create content that attracts, engages, and converts.',
            content: 'Content is king, but distribution is queen.\n\nCreate valuable content that solves problems for your audience. Focus on quality over quantity, and promote your content strategically across multiple channels.',
            date: 'October 26, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%2314b8a6" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3EContent Marketing%3C/text%3E%3C/svg%3E'
        },
        {
            id: 16,
            title: 'Work-Life Balance Tips',
            excerpt: 'Find harmony between your professional and personal life.',
            content: 'Balance isn\'t about equal time—it\'s about priorities.\n\nSet boundaries, make time for what matters, and don\'t feel guilty about rest. A balanced life leads to better work and happier relationships.',
            date: 'October 25, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%23eab308" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3EWork-Life Balance%3C/text%3E%3C/svg%3E'
        },
        {
            id: 17,
            title: 'Email Marketing Best Practices',
            excerpt: 'Build an email list and create campaigns that convert.',
            content: 'Email isn\'t dead—it\'s more powerful than ever.\n\nBuild your list organically, segment your audience, and provide value in every email. Personalization and timing are key to high open and click rates.',
            date: 'October 24, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%23f97316" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3EEmail Marketing%3C/text%3E%3C/svg%3E'
        },
        {
            id: 18,
            title: 'Building Resilience',
            excerpt: 'Develop mental toughness to overcome any challenge.',
            content: 'Resilience is a skill you can develop.\n\nFace challenges head-on, maintain perspective, and build a support system. Every obstacle is an opportunity to grow stronger and wiser.',
            date: 'October 23, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%238b5cf6" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3EResilience%3C/text%3E%3C/svg%3E'
        },
        {
            id: 19,
            title: 'Networking for Success',
            excerpt: 'Build meaningful professional relationships that last.',
            content: 'Your network is your net worth.\n\nFocus on building genuine relationships, not just collecting contacts. Offer value first, stay in touch regularly, and be authentic in your interactions.',
            date: 'October 22, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%2306b6d4" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3ENetworking%3C/text%3E%3C/svg%3E'
        },
        {
            id: 20,
            title: 'The Future is Now',
            excerpt: 'Embrace change and prepare for what\'s coming next.',
            content: 'The future belongs to those who prepare for it today.\n\nStay curious, keep learning, and adapt quickly. The only constant is change, so embrace it rather than resist it. Your future self will thank you.',
            date: 'October 21, 2025',
            image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%23f59e0b" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="32px" fill="white"%3EThe Future%3C/text%3E%3C/svg%3E'
        }
    ];
    
    // Save defaults to localStorage
    localStorage.setItem('blogPosts', JSON.stringify(defaultPosts));
    return defaultPosts;
}

// Pagination settings
const POSTS_PER_PAGE = 9;
let currentBlogPage = 1;
let blogSearchQuery = '';

// Calculate reading time
function calculateReadingTime(content) {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
}

// Cache for post stats
let postStatsCache = {};
let postStatsCacheTime = 0;

// Get all post views in one batch
async function getAllPostViews(postIds) {
    try {
        const now = Date.now();
        
        // Return cached data if still valid
        if (Object.keys(postStatsCache).length > 0 && (now - postStatsCacheTime) < CACHE_DURATION) {
            return postStatsCache;
        }
        
        // Fetch all stats at once (you'll need to implement this in firebase-db.js)
        const stats = {};
        for (const postId of postIds) {
            const postStats = await getPostStatsFromFirebase(postId);
            stats[postId] = postStats?.views || 0;
        }
        
        postStatsCache = stats;
        postStatsCacheTime = now;
        
        return stats;
    } catch (error) {
        console.error('Error getting views:', error);
        return {};
    }
}

// Get post views from cache
function getPostViews(postId) {
    return postStatsCache[postId] || 0;
}

// Filter blog posts by search query
function filterBlogPosts(posts) {
    // First filter out hidden posts
    let visiblePosts = posts.filter(post => !post.hidden);
    
    if (!blogSearchQuery) return visiblePosts;
    
    const query = blogSearchQuery.toLowerCase();
    return visiblePosts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        (post.content && post.content.toLowerCase().includes(query))
    );
}

// Render blog posts for current page
async function renderBlogPosts(page = 1) {
    console.log('🔄 Rendering blog posts...');
    const blogGrid = document.getElementById('blog-grid');
    
    if (!blogGrid) {
        console.error('❌ Blog grid not found!');
        return;
    }
    
    // Show skeleton loaders
    blogGrid.innerHTML = `
        <div class="skeleton-grid">
            ${Array(6).fill('').map(() => `
                <div class="skeleton-blog-card">
                    <div class="skeleton skeleton-blog-image"></div>
                    <div class="skeleton skeleton-blog-meta"></div>
                    <div class="skeleton skeleton-blog-title"></div>
                    <div class="skeleton skeleton-blog-text"></div>
                    <div class="skeleton skeleton-blog-text" style="width: 80%;"></div>
                </div>
            `).join('')}
        </div>
    `;
    
    let blogPosts = await getBlogPosts();
    console.log('📝 Blog posts loaded from Firebase:', blogPosts.length, blogPosts);
    
    // Apply search filter
    blogPosts = filterBlogPosts(blogPosts);
    
    if (blogPosts.length === 0) {
        blogGrid.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 3rem;">No blog posts found.</p>';
        document.querySelector('.pagination').innerHTML = '';
        return;
    }
    
    // Calculate pagination
    const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
    const startIndex = (page - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const postsToShow = blogPosts.slice(startIndex, endIndex);
    
    // Clear grid
    blogGrid.innerHTML = '';
    
    // Fetch all view counts at once
    const postIds = postsToShow.map(p => p.id);
    await getAllPostViews(postIds);
    
    // Render posts for current page
    for (const post of postsToShow) {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        const readingTime = calculateReadingTime(post.content);
        const views = getPostViews(post.id);
        
        blogCard.innerHTML = `
            <img src="${post.image}" alt="${post.title}" loading="lazy" style="width: 100%; height: 200px; object-fit: cover;">
            <div class="blog-content">
                <div class="blog-meta">${post.date} • ${readingTime} min read • ${views} views</div>
                <h3><a href="/blog/${post.id}" class="blog-title-link">${post.title}</a></h3>
                <p>${post.excerpt}</p>
                <a href="/blog/${post.id}" class="read-more">Read More →</a>
            </div>
        `;
        blogGrid.appendChild(blogCard);
    }
    
    // Render pagination
    renderBlogPagination(page, totalPages);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render pagination controls
function renderBlogPagination(currentPage, totalPages) {
    const paginationContainer = document.querySelector('.pagination');
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '<div class="pagination-controls">';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<button class="pagination-btn" onclick="changeBlogPage(${currentPage - 1})">← Previous</button>`;
    }
    
    // Page numbers
    paginationHTML += '<div class="pagination-numbers">';
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `<button class="pagination-btn active">${i}</button>`;
        } else {
            paginationHTML += `<button class="pagination-btn" onclick="changeBlogPage(${i})">${i}</button>`;
        }
    }
    paginationHTML += '</div>';
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<button class="pagination-btn" onclick="changeBlogPage(${currentPage + 1})">Next →</button>`;
    }
    
    paginationHTML += '</div>';
    paginationContainer.innerHTML = paginationHTML;
}

// Change page
async function changeBlogPage(page) {
    currentBlogPage = page;
    await renderBlogPosts(page);
}

// Load Blog Posts
document.addEventListener('DOMContentLoaded', async function() {
    const blogGrid = document.getElementById('blog-grid');
    
    if (blogGrid) {
        await renderBlogPosts(1);
        
        // Search functionality
        const searchInput = document.getElementById('blog-search');
        const clearBtn = document.getElementById('clear-blog-search');
        
        if (searchInput && clearBtn) {
            searchInput.addEventListener('input', async function(e) {
                blogSearchQuery = e.target.value.trim();
                currentBlogPage = 1;
                await renderBlogPosts(1);
            
            // Show/hide clear button
            clearBtn.style.display = blogSearchQuery ? 'block' : 'none';
        });
        
            clearBtn.addEventListener('click', async function() {
                searchInput.value = '';
                blogSearchQuery = '';
                currentBlogPage = 1;
                await renderBlogPosts(1);
                clearBtn.style.display = 'none';
            });
        }
    }
});

// Make changeBlogPage globally accessible
window.changeBlogPage = changeBlogPage;
