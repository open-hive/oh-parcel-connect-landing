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
    if (!particlesContainer) return; // Exit if container doesn't exist
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

// Enhanced Carousel with Controls, Indicators, and Fullscreen
const carouselTrack = document.querySelector('.carousel-track');
if (carouselTrack) {
    const carouselCards = document.querySelectorAll('.carousel-card');
    const totalSlides = carouselCards.length;
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    // Fullscreen viewer elements
    const fullscreenViewer = document.getElementById('fullscreenViewer');
    const fullscreenImage = fullscreenViewer.querySelector('.fullscreen-image');
    const fullscreenClose = fullscreenViewer.querySelector('.fullscreen-close');
    const fullscreenPrev = fullscreenViewer.querySelector('.fullscreen-prev');
    const fullscreenNext = fullscreenViewer.querySelector('.fullscreen-next');
    const currentSlideSpan = fullscreenViewer.querySelector('.current-slide');

    let currentIndex = 0;
    let fullscreenIndex = 0;

    // Image sources for fullscreen
    const imageSources = Array.from(carouselCards).map(card =>
        card.querySelector('img').src
    );

    // Clone items for infinite scroll effect
    const items = Array.from(carouselTrack.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carouselTrack.appendChild(clone);
    });

    let scrollPos = 0;
    let isPaused = false;
    const speed = 1; // Pixels per frame
    const cardWidth = 280 + 30; // Card width + gap

    // Auto-scroll animation
    function autoScroll() {
        if (!isPaused) {
            scrollPos += speed;
            // Reset when scrolled past half (original set)
            if (scrollPos >= carouselTrack.scrollWidth / 2) {
                scrollPos = 0;
            }
            carouselTrack.style.transform = `translateX(-${scrollPos}px)`;

            // Update current index based on scroll position
            currentIndex = Math.floor(scrollPos / cardWidth) % totalSlides;
            updateIndicators();
        }
        requestAnimationFrame(autoScroll);
    }

    autoScroll();

    // Update active indicator
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // Navigate to specific slide
    function goToSlide(index) {
        isPaused = true;
        currentIndex = index;
        scrollPos = index * cardWidth;
        carouselTrack.style.transform = `translateX(-${scrollPos}px)`;
        updateIndicators();

        // Resume auto-scroll after a delay
        setTimeout(() => {
            isPaused = false;
        }, 3000);
    }

    // Previous slide
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = totalSlides - 1;
            goToSlide(newIndex);
        });
    }

    // Next slide
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let newIndex = (currentIndex + 1) % totalSlides;
            goToSlide(newIndex);
        });
    }

    // Indicator click
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => isPaused = true);
        carouselContainer.addEventListener('mouseleave', () => isPaused = false);
    }

    // Click to fullscreen
    document.querySelectorAll('.carousel-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            // Only original cards (not clones)
            if (index < totalSlides) {
                openFullscreen(index);
            } else {
                // For clones, map back to original index
                openFullscreen(index % totalSlides);
            }
        });
    });

    // Open fullscreen viewer
    function openFullscreen(index) {
        fullscreenIndex = index;
        fullscreenImage.src = imageSources[fullscreenIndex];
        currentSlideSpan.textContent = fullscreenIndex + 1;
        fullscreenViewer.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    // Close fullscreen viewer
    function closeFullscreen() {
        fullscreenViewer.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    }

    fullscreenClose.addEventListener('click', closeFullscreen);

    // Close on background click
    fullscreenViewer.addEventListener('click', (e) => {
        if (e.target === fullscreenViewer) {
            closeFullscreen();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fullscreenViewer.classList.contains('active')) {
            closeFullscreen();
        }
        // Arrow key navigation in fullscreen
        if (fullscreenViewer.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                navigateFullscreen(-1);
            } else if (e.key === 'ArrowRight') {
                navigateFullscreen(1);
            }
        }
    });

    // Navigate in fullscreen
    function navigateFullscreen(direction) {
        fullscreenIndex += direction;
        if (fullscreenIndex < 0) fullscreenIndex = totalSlides - 1;
        if (fullscreenIndex >= totalSlides) fullscreenIndex = 0;

        fullscreenImage.src = imageSources[fullscreenIndex];
        currentSlideSpan.textContent = fullscreenIndex + 1;
    }

    fullscreenPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateFullscreen(-1);
    });

    fullscreenNext.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateFullscreen(1);
    });
}


