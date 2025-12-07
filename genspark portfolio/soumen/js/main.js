// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

const navTrigger = document.getElementById('navTrigger');
const mainNav = document.getElementById('mainNav');
const navClose = document.getElementById('navClose');
const navLinks = document.querySelectorAll('.nav-link');

// Open navigation
navTrigger.addEventListener('click', () => {
    mainNav.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close navigation
navClose.addEventListener('click', () => {
    mainNav.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close navigation when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close navigation when clicking outside
mainNav.addEventListener('click', (e) => {
    if (e.target === mainNav) {
        mainNav.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// SMOOTH SCROLLING
// ============================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

// Intersection Observer for fade-in animations
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

// Observe elements for animation
const animateElements = document.querySelectorAll('.portfolio-item, .skill-item, .about-text, .about-image, .contact-text, .contact-form');

animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ============================================
// PARALLAX EFFECT ON HERO SECTION
// ============================================

let lastScrollTop = 0;
const portfolioText = document.querySelector('.portfolio-text');
const portraitContainer = document.querySelector('.portrait-container');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop < window.innerHeight) {
        // Parallax effect on hero elements
        const scrollPercent = scrollTop / window.innerHeight;
        
        if (portfolioText) {
            portfolioText.style.transform = `translateY(${scrollTop * 0.3}px)`;
            portfolioText.style.opacity = 1 - scrollPercent * 1.5;
        }
        
        if (portraitContainer) {
            portraitContainer.style.transform = `translateY(${-50 + scrollTop * 0.2}%)`;
        }
    }
    
    lastScrollTop = scrollTop;
});

// ============================================
// PORTFOLIO ITEM HOVER EFFECTS
// ============================================

const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    const image = item.querySelector('.portfolio-placeholder');
    
    item.addEventListener('mouseenter', () => {
        // Add subtle animation on hover
        image.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
    });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Log form data (in a real application, this would be sent to a server)
        console.log('Form submitted:', formData);
        
        // Show success message
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.backgroundColor = '#4CAF50';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '#E8D5C4';
        }, 3000);
    });
}

// ============================================
// SCROLL INDICATOR VISIBILITY
// ============================================

const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 200) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// ============================================
// CURSOR FOLLOW EFFECT (Optional Enhancement)
// ============================================

// Custom cursor for desktop
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        border: 1px solid #E8D5C4;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Expand cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .nav-trigger');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
        });
    });
}

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// RESPONSIVE NAVIGATION HEIGHT FIX
// ============================================

// Fix for mobile viewport height
const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setVH();
window.addEventListener('resize', setVH);

// ============================================
// KEYBOARD NAVIGATION ACCESSIBILITY
// ============================================

// Close navigation with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ============================================
// ACTIVE SECTION HIGHLIGHTING
// ============================================

// Highlight active section in navigation
const sections = document.querySelectorAll('section[id]');

const highlightNavigation = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', highlightNavigation);

// ============================================
// CONSOLE LOG - DEVELOPMENT INFO
// ============================================

console.log('%c Portfolio Website Ready! ', 'background: #E8D5C4; color: #0A0A0A; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%c Built with HTML, CSS & JavaScript ', 'background: #1A1A1A; color: #E8D5C4; font-size: 12px; padding: 5px;');
