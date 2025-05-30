// Configuration for ITECH SERVICE Website
// Edit these values to customize aspects of the website

export const config = {
    // Company Information
    company: {
        name: "ITECH SERVICE SARL",
        slogan: "Solutions informatiques professionnelles au Cameroun",
        year: "2023", // Year for copyright
        address: "4730 Immeuble TAYOU, Douala, Cameroun",
        phone1: "+237 659 597 891",
        phone2: "+237 6XX XXX XXX",
        email: "contact@itechservicesarl.com",
        supportEmail: "contact@itechservicesarl.com"
    },
    
    // Social Media Links
    socialMedia: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        instagram: "#"
    },
    
    // Shop Link (replace with actual e-commerce URL)
    shopUrl: "#boutique",
    
    // Opening Hours
    openingHours: {
        weekdays: "8h - 18h",
        saturday: "9h - 15h",
        sunday: "Fermé"
    },
    
    // SEO Settings
    seo: {
        title: "ITECH SERVICE SARL | Solutions Informatiques au Cameroun",
        description: "ITECH SERVICE SARL - Vente, installation et maintenance d'équipements informatiques, internet par radio, fibre et box TV au Cameroun",
        keywords: "informatique, maintenance, fibre optique, Cameroun, internet par radio, réseau informatique, box TV"
    },

    // Key Metrics
    keyMetrics: {
        yearsExperience: "7+",
        clientsSatisfied: "150+",
        solutionsDeployed: "300+"
    },

    // Partner Logos - provide paths to actual logos
    partnerLogos: [
        { src: "assets/images/partners/partner-logo-1.png", alt: "Partenaire 1" },
        { src: "assets/images/partners/partner-logo-2.png", alt: "Partenaire 2" },
        { src: "assets/images/partners/partner-logo-3.png", alt: "Partenaire 3" },
        { src: "assets/images/partners/partner-logo-4.png", alt: "Partenaire 4" },
        { src: "assets/images/partners/partner-logo-5.png", alt: "Partenaire 5" }
    ]
};

// Apply configuration values to the website
// This function is imported and called by scripts.js after partials are loaded.
export function applyConfigToDOM() {
    // Update company information in footer
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentText = footerYear.textContent;
        if (currentText.includes(config.company.name)) { // Check if name is already there
             footerYear.textContent = `© ${config.company.year} ${config.company.name}. Tous droits réservés.`;
        } else {
             footerYear.innerHTML = `&copy; ${config.company.year} ${config.company.name}. Tous droits réservés.`; // Use innerHTML for &copy;
        }
    }
    const footerSlogan = document.querySelector('.footer-logo p');
    if (footerSlogan) footerSlogan.textContent = config.company.slogan;

    // Update footer contact details
    const footerEmail = document.getElementById('footer-email');
    if (footerEmail) footerEmail.innerHTML = `<i class="fas fa-envelope"></i> ${config.company.email}`;
    const footerPhone1 = document.getElementById('footer-phone1');
    if (footerPhone1) footerPhone1.innerHTML = `<i class="fas fa-phone-alt"></i> ${config.company.phone1}`;

    // Update document title
    document.title = config.seo.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', config.seo.description);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
        metaKeywords.setAttribute('content', config.seo.keywords);
    }

    // Update contact information
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        const titleElement = card.querySelector('h3');
        if (!titleElement) return;
        const title = titleElement.textContent.toLowerCase();
        
        const pElements = card.querySelectorAll('p');

        if (title.includes('adresse')) {
            if (pElements.length > 0) pElements[0].textContent = config.company.address;
        } else if (title.includes('téléphone')) {
            if (pElements.length >= 1) pElements[0].textContent = config.company.phone1;
            if (pElements.length >= 2) pElements[1].textContent = config.company.phone2;
        } else if (title.includes('email')) {
            if (pElements.length >= 1) pElements[0].textContent = config.company.email;
            if (pElements.length >= 2) pElements[1].textContent = config.company.supportEmail;
        } else if (title.includes('horaires')) {
            if (pElements.length >= 1) pElements[0].textContent = `Lundi - Vendredi: ${config.openingHours.weekdays}`;
            if (pElements.length >= 2) pElements[1].textContent = `Samedi: ${config.openingHours.saturday}`;
            // Potentially add Sunday if there's a third p element
            if (pElements.length >= 3 && config.openingHours.sunday) {
                 pElements[2].textContent = `Dimanche: ${config.openingHours.sunday}`;
            } else if (pElements.length >=3) {
                pElements[2].style.display = 'none'; // Hide if no Sunday hours
            }
        }
    });
    
    // Update shop links
    const shopLinks = document.querySelectorAll('a[href="#boutique"]');
    shopLinks.forEach(link => {
        link.setAttribute('href', config.shopUrl);
    });

    // Update social media links
    const socialIconsContainer = document.querySelector('.footer-social .social-icons');
    if (socialIconsContainer) {
        const facebookLink = socialIconsContainer.querySelector('a[aria-label="Facebook"]');
        if (facebookLink) facebookLink.href = config.socialMedia.facebook;
        const twitterLink = socialIconsContainer.querySelector('a[aria-label="Twitter"]');
        if (twitterLink) twitterLink.href = config.socialMedia.twitter;
        const linkedinLink = socialIconsContainer.querySelector('a[aria-label="LinkedIn"]');
        if (linkedinLink) linkedinLink.href = config.socialMedia.linkedin;
        const instagramLink = socialIconsContainer.querySelector('a[aria-label="Instagram"]');
        if (instagramLink) instagramLink.href = config.socialMedia.instagram;
    }

    // Update logo alt text
    const logoImages = document.querySelectorAll('.logo img');
    logoImages.forEach(img => img.alt = `${config.company.name} Logo`);
    const footerLogoImage = document.querySelector('.footer-logo img');
    if (footerLogoImage) footerLogoImage.alt = `${config.company.name} Logo`;

    // Update Key Metrics
    const yearsExpEl = document.getElementById('yearsExperienceMetric');
    if (yearsExpEl) yearsExpEl.textContent = config.keyMetrics.yearsExperience;
    
    const clientsSatEl = document.getElementById('clientsSatisfiedMetric');
    if (clientsSatEl) clientsSatEl.textContent = config.keyMetrics.clientsSatisfied;

    const solutionsDepEl = document.getElementById('solutionsDeployedMetric');
    if (solutionsDepEl) solutionsDepEl.textContent = config.keyMetrics.solutionsDeployed;
}