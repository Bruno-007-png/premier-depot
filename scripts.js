import { applyConfigToDOM } from './config.js';

// --- Page Initialization Functions ---

function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!mobileMenu || !navMenu) {
        console.warn('Mobile menu elements not found. Skipping mobile menu initialization.');
        return;
    }
    
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // Optional: prevent body scroll when menu is open
        
        const bars = mobileMenu.querySelectorAll('.bar');
        if (mobileMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                mobileMenu.click(); 
            }
        });
    });
}

// --- Hero Slider ---
function initHeroSlider() {
    if (typeof Swiper === 'undefined') {
        console.warn('Swiper library not loaded. Skipping hero slider initialization.');
        const heroPlaceholder = document.querySelector('.hero-swiper');
        if(heroPlaceholder) {
            heroPlaceholder.innerHTML = '<p style="text-align:center; padding: 50px; color: white;">Error loading slider.</p>';
        }
        return;
    }
    new Swiper('.hero-swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
             crossFade: true
        },
        speed: 1000, // Transition speed in ms
    });
}

// --- Scroll-based UI updates ---
function updateActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    if (sections.length === 0 || navLinks.length === 0) return;

    let scrollPosition = window.scrollY + (document.querySelector('header')?.offsetHeight || 70) + 50; // Header height + offset
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
     // Special case for bottom of page / last section
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) { // near bottom
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
            const lastSectionId = lastSection.getAttribute('id');
             navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${lastSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }
}

function updateBackToTopButtonVisibility() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (!backToTopButton) return;

    if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
}

function updateHeaderStyleOnScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    const nav = header.querySelector('nav'); // Get the nav element for padding adjustments

    if (window.scrollY > 50) {
        if (nav) nav.style.padding = '5px 0'; // Adjust padding on nav, not header directly
        header.style.boxShadow = 'var(--header-scrolled-shadow)';
    } else {
        if (nav) nav.style.padding = '15px 0'; // Default padding
        header.style.boxShadow = 'var(--header-shadow)';
    }
}

function handlePageScroll() {
    updateActiveNavLinkOnScroll();
    updateBackToTopButtonVisibility();
    updateHeaderStyleOnScroll();
}

function initScrollDependentFeatures() {
    handlePageScroll(); // Initial call
    window.addEventListener('scroll', handlePageScroll, { passive: true });
}

// --- Form Submission ---
function initFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            console.log('Contact form submitted with data:');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            alert('Merci pour votre message ! Nous vous contacterons bientôt.');
            contactForm.reset();
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput) {
                 console.log('Newsletter subscription:', emailInput.value);
            }
            alert('Merci pour votre inscription à notre newsletter !');
            newsletterForm.reset();
        });
    }
}

// --- Load Partials ---
async function loadPartials() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Définir les éléments partiels pour chaque type de page
    const pagePartials = {
        'index.html': [
            { placeholderId: 'header-placeholder', filePath: 'partials/header.html' },
            { placeholderId: 'hero-placeholder', filePath: 'partials/hero.html', isMainContent: true },
            { placeholderId: 'services-placeholder', filePath: 'partials/services.html', isMainContent: true },
            { placeholderId: 'expertise-placeholder', filePath: 'partials/expertise.html', isMainContent: true },
            { placeholderId: 'about-placeholder', filePath: 'partials/about.html', isMainContent: true },
            { placeholderId: 'key-metrics-placeholder', filePath: 'partials/key-metrics.html', isMainContent: true },
            { placeholderId: 'partners-placeholder', filePath: 'partials/partners.html', isMainContent: true },
            { placeholderId: 'products-placeholder', filePath: 'partials/products.html', isMainContent: true },
            { placeholderId: 'contact-placeholder', filePath: 'partials/contact.html', isMainContent: true },
            { placeholderId: 'footer-placeholder', filePath: 'partials/footer.html' }
        ],
        'mentions-legales.html': [
            { placeholderId: 'header-placeholder', filePath: 'partials/header.html' },
            { placeholderId: 'footer-placeholder', filePath: 'partials/footer.html' }
        ],
        'politique-confidentialite.html': [
            { placeholderId: 'header-placeholder', filePath: 'partials/header.html' },
            { placeholderId: 'footer-placeholder', filePath: 'partials/footer.html' }
        ],
        'cgv.html': [
            { placeholderId: 'header-placeholder', filePath: 'partials/header.html' },
            { placeholderId: 'footer-placeholder', filePath: 'partials/footer.html' }
        ]
    };

    // Sélectionner les éléments partiels pour la page courante
    const partials = pagePartials[currentPage] || pagePartials['index.html'];
    const mainContentContainer = document.getElementById('main-content');

    for (const partial of partials) {
        try {
            const response = await fetch(partial.filePath);
            if (!response.ok) {
                console.error(`Failed to load partial: ${partial.filePath}`, response.statusText);
                const placeholder = document.getElementById(partial.placeholderId);
                if (placeholder) placeholder.innerHTML = `<p style="color: red; text-align: center;">Error loading content for ${partial.filePath}</p>`;
                continue;
            }
            const html = await response.text();
            const placeholder = document.getElementById(partial.placeholderId);
            
            if (placeholder) {
                 placeholder.innerHTML = html;
            } else {
                console.warn(`Placeholder not found for ${partial.filePath}: ${partial.placeholderId}`);
            }
        } catch (error) {
            console.error(`Error fetching partial ${partial.filePath}:`, error);
            const placeholder = document.getElementById(partial.placeholderId);
            if (placeholder) placeholder.innerHTML = `<p style="color: red; text-align: center;">Error loading content for ${partial.filePath}</p>`;
        }
    }
}

// --- Main Page Orchestration ---
function initializePageInteractivity() {
    if (typeof applyConfigToDOM === 'function') {
        applyConfigToDOM();
    } else {
        console.warn('applyConfigToDOM function from config.js not available. Site configuration might not be fully applied.');
    }

    initMobileMenu();
    initHeroSlider(); // Initialize the hero slider
    initScrollDependentFeatures(); 
    // Removed initCountAnimationEventListeners();
    initFormSubmission();
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadPartials();
    initializePageInteractivity();
});