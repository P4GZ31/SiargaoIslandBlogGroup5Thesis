// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navigation functionality
function initNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Attraction cards toggle functionality
function toggleCard(element) {
    const card = element.closest('.attraction-card');
    const content = card.querySelector('.card-content');
    const icon = card.querySelector('.card-title i');
    
    // Toggle active state
    card.classList.toggle('active');
    content.classList.toggle('active');
    
    // Rotate icon
    if (card.classList.contains('active')) {
        icon.style.transform = 'rotate(180deg)';
        content.style.maxHeight = content.scrollHeight + 'px';
    } else {
        icon.style.transform = 'rotate(0deg)';
        content.style.maxHeight = '0px';
    }
}

// Scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Social sharing functions
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('Siargao Island: The Ultimate Tropical Escape');
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Discover Siargao Island, Southeast Asia\'s premier tropical paradise! 🏄‍♂️🌊');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400');
}

function shareOnPinterest() {
    const url = encodeURIComponent(window.location.href);
    const description = encodeURIComponent('Siargao Island: The Ultimate Tropical Escape - Complete Travel Guide');
    const media = encodeURIComponent('https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630');
    window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${description}&media=${media}`, '_blank', 'width=600,height=400');
}

function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out this amazing travel guide to Siargao Island! 🏝️');
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
}

// Scroll reveal animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const reveal = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', reveal);
    reveal(); // Initial check
}

// Add scroll reveal classes to elements
function addScrollRevealClasses() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('scroll-reveal');
    });
    
    const cards = document.querySelectorAll('.attraction-card, .food-card, .weather-card, .sustainability-tip, .fact-item, .transport-option');
    cards.forEach((card, index) => {
        card.classList.add('scroll-reveal');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Intersection Observer for better performance
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Add active state to navigation based on scroll position
function initActiveNavigation() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Enhanced CTA button interactions
function initCTAInteractions() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', (e) => {
            // Add click animation
            button.style.transform = 'translateY(0) scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'translateY(-2px) scale(1.05)';
            }, 150);
        });
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
}

// Add loading states
function addLoadingStates() {
    const interactiveElements = document.querySelectorAll('button, .card-header');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 500);
        });
    });
}

// Enhanced timeline animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });
}

// Error handling for external resources
function handleResourceErrors() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
    
    // Handle iframe errors
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.addEventListener('error', function() {
            const container = this.parentElement;
            container.innerHTML = '<p>Map could not be loaded. Please check your internet connection.</p>';
        });
    });
}

// Accessibility improvements
function initAccessibility() {
    // Add keyboard navigation for cards
    const cardHeaders = document.querySelectorAll('.card-header');
    cardHeaders.forEach(header => {
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
        
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCard(header);
                const isExpanded = header.closest('.attraction-card').classList.contains('active');
                header.setAttribute('aria-expanded', isExpanded);
            }
        });
    });
    
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#quick-facts';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Performance optimization
function initPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandlers = [];
    
    // Collect all scroll handlers
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            // Execute scroll handlers here
        }, 16); // ~60fps
    });
    
    // Preload critical images
    const criticalImages = [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    initNavigation();
    addScrollRevealClasses();
    
    // Enhanced features
    if ('IntersectionObserver' in window) {
        initIntersectionObserver();
        initLazyLoading();
    } else {
        // Fallback for older browsers
        initScrollReveal();
    }
    
    // Additional features
    initActiveNavigation();
    initCTAInteractions();
    initParallaxEffect();
    addLoadingStates();
    initTimelineAnimations();
    handleResourceErrors();
    initAccessibility();
    initPerformanceOptimizations();
    
    // Add smooth animations on load
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is hidden
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page is visible
        document.body.style.animationPlayState = 'running';
    }
});

// Add global error handling
window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.error);
});

// Export functions for global access
window.toggleCard = toggleCard;
window.scrollToSection = scrollToSection;
window.shareOnFacebook = shareOnFacebook;
window.shareOnTwitter = shareOnTwitter;
window.shareOnPinterest = shareOnPinterest;
window.shareOnWhatsApp = shareOnWhatsApp;
