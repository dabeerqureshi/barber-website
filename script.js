// Texas Classic Barber Shop - JavaScript

// DOM Elements
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const sections = document.querySelectorAll('section');
const scrollProgress = document.createElement('div');
const bookingForm = document.getElementById('booking-form');

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initMobileNav();
    initSmoothScrolling();
    initFormHandling();
    initScrollAnimations();
    initScrollSpy();
    initTexasAnimation();
    initGalleryEffects();
    initTypingEffect();
    displayRandomQuote();
    addLoadingAnimation();
});

// 1. Scroll Progress Indicator
function initScrollProgress() {
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    });
}

// 2. Mobile Navigation Toggle
function initMobileNav() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// 3. Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 4. Form Handling
function initFormHandling() {
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                datetime: document.getElementById('datetime').value
            };

            // Basic validation
            if (!validateForm(formData)) {
                return;
            }

            // Simulate booking confirmation
            showBookingConfirmation(formData);
        });
    }
}

function validateForm(data) {
    if (!data.name || !data.email || !data.phone || !data.service || !data.datetime) {
        alert('Please fill in all fields.');
        return false;
    }

    if (!isValidEmail(data.email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (!isValidPhone(data.phone)) {
        alert('Please enter a valid phone number.');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(phone);
}

function showBookingConfirmation(data) {
    // Create confirmation message
    const confirmation = document.createElement('div');
    confirmation.className = 'booking-confirmation';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <div class="confirmation-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Appointment Booked!</h3>
            <p>Thank you, ${data.name}! Your ${getServiceName(data.service)} appointment is scheduled for ${formatDateTime(data.datetime)}.</p>
            <p>We'll send a confirmation to ${data.email}.</p>
            <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;

    // Style the confirmation
    confirmation.style.position = 'fixed';
    confirmation.style.top = '50%';
    confirmation.style.left = '50%';
    confirmation.style.transform = 'translate(-50%, -50%)';
    confirmation.style.backgroundColor = 'white';
    confirmation.style.padding = '2rem';
    confirmation.style.borderRadius = '10px';
    confirmation.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    confirmation.style.zIndex = '10000';
    confirmation.style.textAlign = 'center';
    confirmation.style.maxWidth = '400px';
    confirmation.style.width = '90%';

    document.body.appendChild(confirmation);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (confirmation.parentElement) {
            confirmation.remove();
        }
    }, 5000);
}

function getServiceName(serviceValue) {
    const services = {
        'haircut': 'Classic Haircut',
        'shave': 'Hot Towel Shave',
        'beard': 'Beard Grooming',
        'facial': 'Facial Treatment'
    };
    return services[serviceValue] || serviceValue;
}

function formatDateTime(datetimeString) {
    const date = new Date(datetimeString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

// 5. Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    document.querySelectorAll('.service-card, .gallery-item, .info-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 6. Scroll Spy (Highlight active nav item)
function initScrollSpy() {
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Update active navigation
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Change navbar background on scroll
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 7. Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// 8. Texas-themed Animation
function initTexasAnimation() {
    // Add subtle Texas star animation
    setInterval(() => {
        const heroText = document.querySelector('.hero-text');
        if (heroText) {
            heroText.style.transform = 'scale(1.02)';
            setTimeout(() => {
                heroText.style.transform = 'scale(1)';
            }, 1000);
        }
    }, 5000);
}

// 9. Gallery Hover Effects
function initGalleryEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });
}

// 10. Typing Effect for Hero Text (Optional Enhancement)
function initTypingEffect() {
    const heroText = document.querySelector('.hero-text h2');
    if (heroText) {
        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Add some Texas flair with a random quote
const texasQuotes = [
    "Texas is where the real men get their haircuts.",
    "Everything's bigger in Texas, including our style.",
    "Texas tradition, modern style.",
    "Where cowboys go to look sharp."
];

function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * texasQuotes.length);
    const quote = texasQuotes[randomIndex];
    
    // Add to hero section
    const heroText = document.querySelector('.hero-text p');
    if (heroText) {
        heroText.textContent = quote;
    }
}

// Display random quote on load
displayRandomQuote();

// Add a subtle loading animation
function addLoadingAnimation() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}

// Prevent form submission on Enter key in certain fields
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
    }
});