/* ========================================
   RESET & BASE STYLES
   ======================================== */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%);
    color: #212529;
    line-height: 1.6;
}

/* ========================================
   HEADER & NAVIGATION
   ======================================== */

header {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    color: white;
    padding: 24px 32px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    position: sticky;
    top: 0;
    z-index: 1000;
}

header h1 {
    margin-bottom: 16px;
    font-size: 2em;
    font-weight: 700;
    letter-spacing: -0.5px;
}

nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
}

nav input[type="search"] {
    padding: 12px 20px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-radius: 30px;
    flex: 1;
    min-width: 200px;
    font-size: 14px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

nav input[type="search"]::placeholder {
    color: rgba(255, 255, 255, 0.7);
}

nav input[type="search"]:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

nav a {
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 8px;
    transition: all 0.3s ease;
    font-weight: 500;
    font-size: 15px;
    background: rgba(255, 255, 255, 0.05);
}

nav a:hover {
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* ========================================
   MAIN CONTENT
   ======================================== */

main {
    flex: 1;
    padding: 48px 24px;
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
}

/* ========================================
   ARTICLES & CARDS
   ======================================== */

/* Grid layout for blog and products */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 32px;
    margin-bottom: 40px;
}

article {
    background: #ffffff;
    border: 1px solid #e9ecef;
    border-radius: 16px;
    padding: 0;
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

article:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    border-color: #dee2e6;
}

article h2,
article h3 {
    color: #1a1a1a;
    margin: 0;
    padding: 20px 20px 12px 20px;
    font-size: 1.25em;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.3px;
}

article h2 {
    font-size: 1.35em;
}

article img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    margin: 0;
    display: block;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: transform 0.3s ease;
}

article:hover img {
    transform: scale(1.05);
}

article p {
    margin: 0;
    padding: 0 20px 14px 20px;
    color: #495057;
    font-size: 0.95em;
    line-height: 1.6;
}

article p:first-of-type {
    padding-top: 10px;
}

article p strong {
    color: #2c3e50;
    font-size: 1.2em;
    font-weight: 700;
}

article p small {
    color: #6c757d;
    font-size: 0.875em;
}

article a {
    display: block;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 14px 24px;
    text-decoration: none;
    margin: 0;
    margin-top: auto;
    text-align: center;
    font-weight: 600;
    font-size: 0.95em;
    transition: all 0.3s ease;
    letter-spacing: 0.3px;
}

article a:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.2);
}

/* Single article page (blog details) */
article.single {
    padding: 40px;
    border-radius: 16px;
    max-width: 900px;
    margin: 0 auto;
}

article.single img {
    height: auto;
    max-height: 600px;
    border-radius: 12px;
    margin: 24px 0;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

article.single h2 {
    padding: 0 0 20px 0;
    font-size: 2.5em;
    font-weight: 800;
    letter-spacing: -1px;
}

article.single h3 {
    padding: 0 0 16px 0;
    font-size: 1.3em;
}

article.single p {
    padding: 0 0 20px 0;
    color: #495057;
    font-size: 1.05em;
    line-height: 1.7;
}

article.single p small {
    color: #6c757d;
    font-size: 0.9em;
}

article.single div {
    color: #212529;
    font-size: 1.05em;
    line-height: 1.8;
}

article.single a {
    display: inline-block;
    margin-top: 32px;
    padding: 14px 28px;
    border-radius: 10px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

article.single a:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

/* Error and message articles */
article.message {
    padding: 48px;
    text-align: center;
    border-radius: 16px;
    max-width: 700px;
    margin: 0 auto;
}

article.message h2 {
    padding: 0 0 20px 0;
    font-size: 2em;
    font-weight: 700;
}

article.message p {
    padding: 0 0 20px 0;
    font-size: 1.1em;
    color: #495057;
}

article.message a {
    display: inline-block;
    margin-top: 20px;
    border-radius: 10px;
}

/* ========================================
   FORMS
   ======================================== */

input,
textarea,
button {
    font-family: inherit;
}

input[type="email"],
input[type="text"],
textarea {
    border-radius: 10px;
    border: 2px solid #e9ecef;
    transition: all 0.3s ease;
    padding: 12px 16px;
    font-size: 14px;
}

input[type="email"]:focus,
input[type="text"]:focus,
textarea:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    outline: none;
}

button {
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 600;
    padding: 12px 24px;
    border: none;
}

button:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

button:active {
    transform: scale(0.98);
}

/* Newsletter form specific styles */
#newsletterForm {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    align-items: center;
}

#newsletterForm input[type="email"] {
    width: 320px;
    max-width: 100%;
}

#newsletterForm button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

#newsletterForm button:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

/* Contact form styles */
#contactForm label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #1a1a1a;
}

#contactForm input,
#contactForm textarea {
    width: 100%;
    margin-bottom: 20px;
}

#contactForm button {
    width: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

#contactForm button:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

/* Pagination buttons */
.pagination {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 30px;
    flex-wrap: wrap;
}

.pagination button {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 10px 15px;
}

.pagination button:hover {
    background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%) !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
}

/* ========================================
   FOOTER
   ======================================== */

footer {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    color: #ecf0f1;
    text-align: center;
    padding: 32px 24px;
    font-size: 14px;
    margin-top: 60px;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
}

/* ========================================
   RESPONSIVE DESIGN
   ======================================== */

@media (min-width: 768px) {
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 28px 48px;
    }
    
    header h1 {
        margin-bottom: 0;
    }
    
    nav {
        flex-wrap: nowrap;
        gap: 20px;
    }
    
    nav input[type="search"] {
        flex: 0 1 auto;
        min-width: 300px;
    }
    
    main {
        padding: 64px 48px;
    }
    
    .card-grid {
        gap: 36px;
    }
}

@media (min-width: 1200px) {
    .card-grid {
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    }
}
