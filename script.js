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

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// FAQ Accordion
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
        // Close other items
        accordionItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('open')) {
                otherItem.classList.remove('open');
                const otherToggle = otherItem.querySelector('.accordion-toggle');
                otherToggle.textContent = '+';
            }
        });

        // Toggle current
        item.classList.toggle('open');
        const toggle = item.querySelector('.accordion-toggle');
        if (item.classList.contains('open')) {
            toggle.textContent = '−';
        } else {
            toggle.textContent = '+';
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Run once
        }
    });
}, observerOptions);

// Observe all elements with .fade-in-up class
document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));


// Legacy support for specific elements if they aren't updated to use .fade-in-up in HTML yet
const legacyAnimatedElements = document.querySelectorAll('.feature-item-card, .pricing-card-modern, .register-card, .stat-item, .section-title, .feature-box');
legacyAnimatedElements.forEach(el => {
    el.classList.add('fade-in-up');
    observer.observe(el);
});


// Navbar background on scroll
const navbar = document.querySelector('.navbar');
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
});

// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Hero Email Form submission
const heroEmailForm = document.getElementById('heroEmailForm');
if (heroEmailForm) {
    heroEmailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = heroEmailForm.querySelector('.hero-email-input');
        if (emailInput.value) {
            alert('Thank you for registering! We will contact you soon.');
            emailInput.value = '';
        }
    });
}

// Carousel Auto-Scroll
const carouselTrack = document.querySelector('.carousel-track');
if (carouselTrack) {
    // Clone items for infinite effect
    const items = Array.from(carouselTrack.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carouselTrack.appendChild(clone);
    });

    let scrollPos = 0;
    let isPaused = false;
    const speed = 1; // Pixels per frame

    function autoScroll() {
        if (!isPaused) {
            scrollPos += speed;
            // If we've scrolled past the original set, reset to 0
            // We assume clones effectively double the width, so resetting at half width checks out
            // However, slight precision issues might occur.
            // Better check: if scrollLeft >= scrollWidth / 2
            if (scrollPos >= carouselTrack.scrollWidth / 2) {
                scrollPos = 0;
            }
            carouselTrack.style.transform = `translateX(-${scrollPos}px)`;
        }
        requestAnimationFrame(autoScroll);
    }

    autoScroll();

    // Pause on hover
    const carouselSection = document.querySelector('.app-showcase-section');
    if (carouselSection) {
        carouselSection.addEventListener('mouseenter', () => isPaused = true);
        carouselSection.addEventListener('mouseleave', () => isPaused = false);

        // Also allow manual touch scrolling to pause? 
        // If we use transform for auto-scroll, native scrolling might fight it.
        // For simplicity, we disable native scroll on track by hiding overflow hidden on container
        // and relying purely on this JS transform. 
        // But the previous CSS had overflow-x: auto. 
        // If we want auto-spin + manual scroll, it's complex. 
        // Let's stick to auto-spin essentially acting as a marquee.
        // We will update CSS to hide overflow and rely on this.
    }
}

