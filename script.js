// ========================================
// Theme Toggle
// ========================================
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to system preference
const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme
const setTheme = (theme) => {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
};

// Initialize theme
setTheme(getPreferredTheme());

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// ========================================
// Mobile Navigation
// ========================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// ========================================
// Smooth Scrolling for Anchor Links
// ========================================
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

// ========================================
// Navbar Background on Scroll
// ========================================
const navbar = document.querySelector('.navbar');

const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.boxShadow = 'none';
    }
};

window.addEventListener('scroll', handleNavbarScroll);

// ========================================
// Active Navigation Link Highlighting
// ========================================
const sections = document.querySelectorAll('section[id]');

const highlightNavLink = () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
};

window.addEventListener('scroll', highlightNavLink);

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-item, .project-card, .skill-category, .education-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add CSS for animated elements
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .nav-links a.active {
        color: var(--color-primary);
    }

    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ========================================
// Hero Scroll Indicator
// ========================================
const scrollIndicator = document.querySelector('.hero-scroll');

if (scrollIndicator) {
    // Hide scroll indicator after user starts scrolling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.visibility = 'hidden';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.visibility = 'visible';
        }
    }, { passive: true });
}

// ========================================
// Skill Hover Effects Enhancement
// ========================================
const skillNames = document.querySelectorAll('.skill-name');
skillNames.forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        skill.style.transform = 'translateX(5px)';
        skill.style.color = 'var(--color-accent)';
    });
    
    skill.addEventListener('mouseleave', () => {
        skill.style.transform = 'translateX(0)';
        skill.style.color = '';
    });
});

// ========================================
// Project Card Hover Effects
// ========================================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const projectLinks = card.querySelectorAll('.project-links a');
        projectLinks.forEach(link => {
            link.style.transform = 'rotate(0deg)';
        });
    });
    
    card.addEventListener('mouseleave', () => {
        const projectLinks = card.querySelectorAll('.project-links a');
        projectLinks.forEach(link => {
            link.style.transform = '';
        });
    });
});

// ========================================
// PDF Download Progress Indicator
// ========================================
document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Add a small visual feedback for PDF downloads
        const originalText = link.innerHTML;
        const svg = link.querySelector('svg');
        
        if (svg) {
            // Create a temporary download animation
            const originalTransform = svg.style.transform;
            svg.style.transform = 'scale(1.2)';
            svg.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                svg.style.transform = originalTransform;
            }, 300);
        }
    });
});

// ========================================
// Contact Card Animation
// ========================================
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const svg = card.querySelector('svg');
        if (svg) {
            svg.style.transform = 'scale(1.2) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const svg = card.querySelector('svg');
        if (svg) {
            svg.style.transform = '';
        }
    });
});

// ========================================
// Timeline Marker Animation
// ========================================
const timelineMarkers = document.querySelectorAll('.timeline-marker');
timelineMarkers.forEach(marker => {
    marker.addEventListener('mouseenter', () => {
        marker.style.transform = 'scale(1.2)';
    });
    
    marker.addEventListener('mouseleave', () => {
        marker.style.transform = '';
    });
});

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial scroll handlers
    handleNavbarScroll();
    highlightNavLink();

    // Add loading animation to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('loaded');
    }

    // Add animation delay to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.05}s`;
    });

    // Add animation delay to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// ========================================
// Console Easter Egg
// ========================================
console.log('%c🔍 Hey there, curious developer! ', 'background: linear-gradient(135deg, #2094ff, #6d6af4, #ff6bcb); color: white; font-size: 18px; font-weight: bold; padding: 10px; border-radius: 5px;');
console.log('%cFeel free to check out my code and research!', 'font-size: 14px; color: #6d6af4;');

// ========================================
// Performance Optimization
// ========================================
// Debounce scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        handleNavbarScroll();
        highlightNavLink();
    }, 10);
}, { passive: true });

// ========================================
// Touch Device Detection
// ========================================
const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
};

if (isTouchDevice()) {
    // Add touch-specific styles or behaviors
    document.body.classList.add('touch-device');
    
    // Adjust hover effects for touch devices
    document.querySelectorAll('.project-card, .skill-category, .education-card, .contact-card').forEach(el => {
        el.classList.add('touch-optimized');
    });
}

// ========================================
// Print Styles Enhancement
// ========================================
window.addEventListener('beforeprint', () => {
    // Ensure all content is visible for printing
    document.querySelectorAll('.animate-in').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
});

// ========================================
// Error Handling
// ========================================
window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.error);
    // You could add error reporting here
});

// ========================================
// Keyboard Navigation
// ========================================
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
    
    // Tab key navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});