// Menu Search and Filter Functionality
const menuSearch = document.getElementById('menu-search');
const filterButtons = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

// Function to filter menu items
function filterMenuItems(searchTerm = '', category = 'all') {
    menuCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const cardCategory = card.dataset.category;
        
        const matchesSearch = title.includes(searchTerm.toLowerCase()) || 
                            description.includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'all' || cardCategory === category;
        
        if (matchesSearch && matchesCategory) {
            card.classList.remove('hidden');
            // Re-trigger AOS animation
            card.setAttribute('data-aos', 'fade-up');
            AOS.refresh();
        } else {
            card.classList.add('hidden');
        }
    });
}

// Search input event listener
menuSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    const activeCategory = document.querySelector('.filter-btn.active').dataset.filter;
    filterMenuItems(searchTerm, activeCategory);
});

// Filter button event listeners
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.dataset.filter;
        const searchTerm = menuSearch.value;
        filterMenuItems(searchTerm, category);
    });
});

// Initialize AOS
AOS.init({
    duration: 800,    // Duration of animation
    easing: 'ease-in-out',    // Easing type
    once: true,    // Whether animation should happen only once
    mirror: false,    // Whether elements should animate out while scrolling past them
    offset: 100,    // Offset (in px) from the original trigger point
    delay: 0,    // Delay between each element's animation
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70; // Height of fixed header
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight active section in navigation
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

function highlightActiveSection() {
    const scrollPosition = window.scrollY + 100; // Add offset for better detection

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);
window.addEventListener('load', highlightActiveSection);

// Form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}