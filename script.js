// Theme Management
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update navbar background immediately
    const navbar = document.querySelector('.navbar');
    if (newTheme === 'light') {
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
    }
});
// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const speed = 0.2;

    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .bento-card, .pricing-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });

    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Particle System
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

function createParticles() {
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';

        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Energy Particles Animation
const energyParticlesContainer = document.querySelector('.energy-particles');

function createEnergyParticles() {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'var(--primary-accent)';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 10px var(--primary-accent)';

        energyParticlesContainer.appendChild(particle);

        animateEnergyParticle(particle, i);
    }
}

function animateEnergyParticle(particle, index) {
    const duration = 2000;
    const delay = index * 200;

    function animate() {
        const progress = ((Date.now() - delay) % duration) / duration;
        const x = progress * 300;
        const y = 100 + Math.sin(progress * Math.PI * 4) * 50;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = Math.sin(progress * Math.PI);

        requestAnimationFrame(animate);
    }

    setTimeout(animate, delay);
}

createEnergyParticles();

// Route Dots Animation
const routeDotsContainer = document.querySelector('.route-dots');

function createRouteDots() {
    for (let i = 0; i < 5; i++) {
        const dot = document.createElement('div');
        dot.className = 'route-dot';
        routeDotsContainer.appendChild(dot);

        animateRouteDot(dot, i);
    }
}

function animateRouteDot(dot, index) {
    const path = [
        { x: 50, y: 76 },
        { x: 55, y: 60 },
        { x: 60, y: 44 },
        { x: 65, y: 36 },
        { x: 70, y: 30 }
    ];

    const duration = 10000;
    const delay = index * 2000;

    function animate() {
        const progress = ((Date.now() - delay) % duration) / duration;
        const totalSegments = path.length - 1;
        const currentSegment = Math.floor(progress * totalSegments);
        const segmentProgress = (progress * totalSegments) % 1;

        if (currentSegment < totalSegments) {
            const start = path[currentSegment];
            const end = path[currentSegment + 1];

            const x = start.x + (end.x - start.x) * segmentProgress;
            const y = start.y + (end.y - start.y) * segmentProgress;

            dot.style.left = x + '%';
            dot.style.top = y + '%';
            dot.style.opacity = 1;
        } else {
            dot.style.opacity = 0;
        }

        requestAnimationFrame(animate);
    }

    setTimeout(animate, delay);
}

createRouteDots();

// Earnings Slider
const earningsSlider = document.getElementById('earningsSlider');
const earningsAmount = document.getElementById('earningsAmount');

const earningsValues = [
    'P200',
    'P280',
    'P350',
    'P400',
    'P480',
    'P550'
];

earningsSlider.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    earningsAmount.textContent = earningsValues[value];

    // Animate the number change
    earningsAmount.style.transform = 'scale(1.1)';
    setTimeout(() => {
        earningsAmount.style.transform = 'scale(1)';
    }, 200);
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const animatedElements = document.querySelectorAll('.bento-card, .pricing-card, .section-title, .earnings-title');

animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
    observer.observe(el);
});

// Contact Form Letter Animation
const contactSection = document.querySelector('.contact-section');
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const letters = document.querySelectorAll('.title-letter');
            letters.forEach(letter => {
                letter.style.animationPlayState = 'running';
            });
            contactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

contactObserver.observe(contactSection);

// Contact Form Submission
// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const phoneInput = document.getElementById('phoneInput');
    const messageInput = document.getElementById('messageInput');

    // Get form container for overlay
    const formSection = document.querySelector('.contact-form-section');

    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'form-loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="loading-text">Sending your message...</div>
    `;
    formSection.appendChild(loadingOverlay);

    // Simulate form submission
    setTimeout(() => {
        // Remove loading overlay
        loadingOverlay.remove();

        // Create success overlay
        const successOverlay = document.createElement('div');
        successOverlay.className = 'form-success-overlay';
        successOverlay.innerHTML = `
            <div class="success-icon">✓</div>
            <div class="success-title">Message Sent!</div>
            <div class="success-message">Thank you for contacting us. We'll get back to you soon.</div>
        `;
        formSection.appendChild(successOverlay);

        // Clear form fields
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        messageInput.value = '';

        // Remove success overlay after 3 seconds
        setTimeout(() => {
            successOverlay.style.opacity = '0';
            setTimeout(() => successOverlay.remove(), 300);
        }, 3000);
    }, 2000);
});

// Route Calculator
const fromCity = document.getElementById('fromCity');
const toCity = document.getElementById('toCity');

const routePrices = {
    'gaborone-maun': 'P200 - P400',
    'gaborone-francistown': 'P150 - P300',
    'gaborone-kasane': 'P300 - P500',
    'francistown-maun': 'P180 - P350',
    'francistown-kasane': 'P200 - P400',
    'francistown-gaborone': 'P150 - P300',
    'maun-gaborone': 'P200 - P400',
    'maun-francistown': 'P180 - P350',
    'maun-kasane': 'P150 - P280',
    'kasane-gaborone': 'P300 - P500',
    'kasane-francistown': 'P200 - P400',
    'kasane-maun': 'P150 - P280'
};

function updateEarnings() {
    const from = fromCity.value;
    const to = toCity.value;
    const route = `${from}-${to}`;

    const earningsRange = document.querySelector('.earnings-range');

    if (from === to) {
        earningsRange.textContent = 'P0';
        return;
    }

    earningsRange.textContent = routePrices[route] || 'P100 - P250';

    // Animate the change
    earningsRange.style.transform = 'scale(1.1)';
    setTimeout(() => {
        earningsRange.style.transform = 'scale(1)';
    }, 200);
}

fromCity.addEventListener('change', updateEarnings);
toCity.addEventListener('change', updateEarnings);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offset = 80; // Height of navbar
            const targetPosition = target.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = htmlElement.getAttribute('data-theme') === 'dark'
            ? 'rgba(10, 10, 10, 0.95)'
            : 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = htmlElement.getAttribute('data-theme') === 'dark'
            ? 'rgba(10, 10, 10, 0.8)'
            : 'rgba(255, 255, 255, 0.9)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';

    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
const phoneMockups = document.querySelector('.phone-mockups');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = hero.offsetHeight;

    if (scrolled < heroHeight) {
        const parallaxSpeed = 0.1;
        phoneMockups.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Add glow effect to pricing cards on hover
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});

// Bento card hover effects
const bentoCards = document.querySelectorAll('.bento-card');

bentoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Add floating animation to phone mockups
const phoneLeft = document.querySelector('.phone-left');
const phoneRight = document.querySelector('.phone-right');

function floatPhones() {
    const time = Date.now() * 0.001;

    if (phoneLeft) {
        const offsetY = Math.sin(time) * 10;
        phoneLeft.style.transform = `translateX(-120px) translateZ(-40px) rotateY(15deg) scale(0.85) translateY(${offsetY}px)`;
    }

    if (phoneRight) {
        const offsetY = Math.sin(time + Math.PI) * 10;
        phoneRight.style.transform = `translateX(120px) translateZ(40px) rotateY(-15deg) translateY(${offsetY}px)`;
    }

    requestAnimationFrame(floatPhones);
}

floatPhones();

// Intersection Observer for counting animation
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Add ripple effect to buttons
const buttons = document.querySelectorAll('button, .cta-button, .hero-cta, .earnings-cta, .form-submit');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('🚀 ParcelConnect Landing Page Loaded Successfully!');
console.log('Theme:', htmlElement.getAttribute('data-theme'));
