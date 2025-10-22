/* --------------------------------------------------------------
   Navigation toggling (mobile hamburger)
-------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    /* --------------------------------------------------------------
       Smooth scrolling for intra‑page anchors (optional)
    -------------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* --------------------------------------------------------------
       Simple client‑side validation for the contact form
    -------------------------------------------------------------- */
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();

            // Basic validation
            const name = contactForm.elements['name'].value.trim();
            const email = contactForm.elements['email'].value.trim();
            const message = contactForm.elements['message'].value.trim();

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // In a real project you'd POST to a backend endpoint.
            // Here we just show a friendly thank‑you.
            alert(`Thank you, ${name}! Your message has been received.`);
            contactForm.reset();
        });
    }
});
