// ============================================
// THEME TOGGLE
// ============================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// SMOOTH SCROLLING
// ============================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Add smooth scrolling to all nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    observer.observe(item);
});

// Observe cards
document.querySelectorAll('.overview-card, .stat-card, .highlight-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    card.style.transitionDelay = `${index * 0.1}s`;

    observer.observe(card);
});

// ============================================
// GALLERY LIGHTBOX
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');

// Array of gallery images
const galleryImages = [
    {
        src: 'Travel/Cost/Stanley - Dinner (Hursey Seafood)/stanley.png',
        title: 'Stanley Seafood Feast',
        description: 'Hursey Seafood Restaurant - Extra Large Crayfish, Scallops & Pasta'
    },
    {
        src: 'Travel/Cost/St Helens - Bay of fires lobster/image.png',
        title: 'Bay of Fires Lobster',
        description: 'Fresh lobster rolls at Bay of Fires'
    },
    {
        src: 'Travel/Cost/Bruny island - Lunch/image.png',
        title: 'Bruny Island Oysters',
        description: 'Get Shucked - Mixed and fresh oysters with Asian sauce'
    },
    {
        src: 'Travel/Cost/Hobart - Van Diemens Land Creamery/image.png',
        title: 'Hobart Ice Cream',
        description: 'Van Diemens Land Creamery - Lavender & Leatherwood flavors'
    },
    {
        src: 'Travel/Cost/St Helens - Lease 65 oyster farm/image.png',
        title: 'Lease 65 Oyster Farm',
        description: 'Fresh oysters at St Helens oyster farm'
    },
    {
        src: 'Travel/Cost/Hobart - Dinner (Yamashita)/image.png',
        title: 'Japanese Cuisine',
        description: 'Yamashita Restaurant - Sashimi, Tataki & Rolls'
    },
    {
        src: 'Travel/Cost/Richmond - Fruits from a cherry farm/image.png',
        title: 'Richmond Cherry Farm',
        description: 'Fresh cherries and strawberries from local farm'
    },
    {
        src: 'Travel/Cost/Hobart - Lunch/image.png',
        title: 'Salamanca Market',
        description: 'Scallop skewers at Salamanca Market'
    },
    {
        src: 'Travel/Cost/Swansea - Dinner (Saltshaker restaurant)/image.png',
        title: 'Swansea Dining',
        description: 'Saltshaker Restaurant - Pizza & Seafood Chowder'
    }
];

let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    showImage(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showImage(index) {
    if (index >= 0 && index < galleryImages.length) {
        lightboxImg.src = galleryImages[index].src;
        lightboxCaption.innerHTML = `
            <strong>${galleryImages[index].title}</strong><br>
            ${galleryImages[index].description}
        `;
    }
}

function changeImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }

    showImage(currentImageIndex);
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});

// ============================================
// ANIMATED COUNTERS
// ============================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Observe stat numbers
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('[data-target]');
            statNumbers.forEach(num => {
                if (num.textContent === '0' || num.textContent === 'A$0') {
                    animateCounter(num);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ============================================
// PARALLAX EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero && scrolled <= window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ============================================
// LAZY LOADING IMAGES
// ============================================
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ============================================
// TIMELINE ANIMATION ON SCROLL
// ============================================
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

// ============================================
// MOBILE MENU TOGGLE (if needed in future)
// ============================================
const createMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.display = 'none';

    if (window.innerWidth <= 768) {
        menuToggle.style.display = 'block';
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    document.querySelector('.nav-container').appendChild(menuToggle);
};

// ============================================
// PERFORMANCE: Throttle scroll events
// ============================================
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy operations
window.addEventListener('scroll', throttle(() => {
    // Any expensive scroll operations here
}, 100));

// ============================================
// INITIALIZE ON LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Tasmania & South Australia Travel Website Loaded! ✈️');

    // Add fade-in class to cards after a delay
    setTimeout(() => {
        document.querySelectorAll('.overview-card, .stat-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }, 500);
});

// ============================================
// EASTER EGG: Console Message
// ============================================
console.log(`
%c🌏 Tasmania & South Australia Journey 2025 ✈️
%cAn amazing adventure through Australia's most beautiful regions!

📍 Destinations: Tasmania & South Australia
📅 Duration: January 2025
🏨 Accommodations: 14 nights
🍽️ Restaurants: 30+ dining experiences
💰 Total Budget: ~A$5,200

Made with ❤️ by Claude Code
`,
'font-size: 20px; font-weight: bold; color: #667eea;',
'font-size: 14px; color: #666;'
);

// ============================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// ============================================
window.scrollToSection = scrollToSection;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.changeImage = changeImage;
