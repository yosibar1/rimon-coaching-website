// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            closeMobileMenu();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuOverlay = document.querySelector('.menu-overlay');

function closeMobileMenu() {
    menuToggle?.classList.remove('active');
    navLinks?.classList.remove('active');
    menuOverlay?.classList.remove('active');
    document.body.style.overflow = '';
}

function openMobileMenu() {
    menuToggle?.classList.add('active');
    navLinks?.classList.add('active');
    menuOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

menuToggle?.addEventListener('click', () => {
    if (navLinks?.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

menuOverlay?.addEventListener('click', closeMobileMenu);

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Navbar scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

function handleScroll() {
    // Skip scroll effect on inner pages (pages without hero section)
    const isInnerPage = !document.querySelector('.hero');
    if (isInnerPage) return;

    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
}

// Throttle scroll events for performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// Fade-in animations on scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optionally stop observing after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade classes
document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(element => {
    observer.observe(element);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const btn = this.querySelector('.btn');
        const originalText = btn.textContent;

        // Disable button during submission
        btn.disabled = true;
        btn.textContent = 'שולח...';

        // Simulate submission (replace with actual form handling)
        setTimeout(() => {
            btn.textContent = 'נשלח בהצלחה!';
            btn.style.backgroundColor = '#22c55e';
            btn.style.boxShadow = '0 2px 8px rgba(34, 197, 94, 0.3)';

            // Reset after delay
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.style.boxShadow = '';
                btn.disabled = false;
                this.reset();
            }, 2500);
        }, 800);
    });
}

// Add staggered animation delay to service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Subtle parallax effect for hero image
const heroImage = document.querySelector('.hero-image img');
if (heroImage) {
    let heroTicking = false;

    window.addEventListener('scroll', () => {
        if (!heroTicking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                if (scrolled < 700) {
                    heroImage.style.transform = `translateY(${scrolled * 0.08}px)`;
                }
                heroTicking = false;
            });
            heroTicking = true;
        }
    });
}

// Active nav link highlighting based on scroll position
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            highlightNavOnScroll();
        });
    }
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all other items
        document.querySelectorAll('.faq-item.active').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Content Tabs (Articles page)
document.querySelectorAll('.content-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;

        // Update active tab button
        document.querySelectorAll('.content-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show target content
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        const targetContent = document.getElementById('tab-' + targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Gallery Filter
document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active button
        document.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter items
        document.querySelectorAll('.gallery-item').forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Lightbox Gallery
let currentLightboxIndex = 0;
let galleryItems = [];

function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (!lightbox || !lightboxImg) return;

    galleryItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden), .gallery-preview-item'));
    currentLightboxIndex = galleryItems.indexOf(element);

    const img = element.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    if (galleryItems.length === 0) return;

    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) currentLightboxIndex = galleryItems.length - 1;
    if (currentLightboxIndex >= galleryItems.length) currentLightboxIndex = 0;

    const img = galleryItems[currentLightboxIndex].querySelector('img');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
}

// Close lightbox on background click
document.addEventListener('click', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && e.target === lightbox) {
        closeLightbox();
    }
});

// Lightbox keyboard navigation
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || !lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigateLightbox(-1); // RTL: right = previous
    if (e.key === 'ArrowLeft') navigateLightbox(1);   // RTL: left = next
});

// Initial call to set correct state on page load
document.addEventListener('DOMContentLoaded', () => {
    // On inner pages (not index), always use compact header
    const isInnerPage = !document.querySelector('.hero');
    if (isInnerPage && header) {
        header.classList.add('scrolled');
    }
    handleScroll();
    highlightNavOnScroll();
});
