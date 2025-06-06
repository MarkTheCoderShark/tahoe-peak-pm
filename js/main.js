// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize FAQ accordion
    initFaqAccordion();

    // Show zero fees section only on home page
    const zeroFeesSection = document.querySelector('.zero-fees');
    if (zeroFeesSection) {
        // Check if we're on the home page (either / or /index.html)
        const isHomePage = window.location.pathname === '/' || 
                          window.location.pathname === '/index.html' ||
                          window.location.pathname.endsWith('/index.html');
        
        if (!isHomePage) {
            zeroFeesSection.style.display = 'none';
        }
    }

    // Header scroll animations
    const headerTop = document.querySelector('.header-top');
    const zeroFees = document.querySelector('.zero-fees');
    let lastScroll = 0;
    const scrollThreshold = 100; // Adjust this value to control when the animation triggers

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const isHomePage = window.location.pathname === '/' || 
                          window.location.pathname === '/index.html' ||
                          window.location.pathname.endsWith('/index.html');

        // Only handle zero-fees animations on home page
        if (isHomePage) {
            if (currentScroll > scrollThreshold) {
                headerTop?.classList.add('hidden');
                zeroFees?.classList.add('hidden');
            } else {
                headerTop?.classList.remove('hidden');
                zeroFees?.classList.remove('hidden');
            }
        }

        lastScroll = currentScroll;
    });

    // Contact Form Submission
    const consultationForm = document.querySelector('form[name="consultation"]');
    const successMessage = document.getElementById('form-success');

    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            // Let Netlify handle the form submission
            // Show success message after a short delay
            setTimeout(() => {
                if (successMessage) {
                    successMessage.classList.remove('hidden');
                    consultationForm.classList.add('hidden');
                }
            }, 1000);
        });
    }

    // Update copyright year
    const copyrightElement = document.querySelector('.footer-bottom p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = `&copy; ${currentYear} Tahoe Peak Property Management. All rights reserved.`;
    }

    // Agent Referral Form Handling
    const agentReferralForm = document.querySelector('.partner-form');
    const agentReferralSuccess = document.querySelector('.form-success');

    if (agentReferralForm) {
        agentReferralForm.addEventListener('submit', function(e) {
            // The form will be handled by Netlify Forms
            // We just need to show the success message
            setTimeout(function() {
                agentReferralForm.classList.add('hidden');
                agentReferralSuccess.classList.remove('hidden');
            }, 1000);
        });
    }

    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Scroll Reveal Animation
function initScrollReveal() {
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('active');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mainNav.classList.toggle('active');
            body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target) && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992 && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
}

// Smooth Scrolling
function initSmoothScroll() {
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
}

// Header Scroll Effect
function initHeaderScroll() {
    const headerMain = document.querySelector('.header-main');
    
    if (headerMain) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                headerMain.classList.add('scrolled');
            } else {
                headerMain.classList.remove('scrolled');
            }
        });
    }
}

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Add form validation to all forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
            e.preventDefault();
            alert('Please fill in all required fields');
        }
    });
});

// Image Lazy Loading
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => lazyLoadObserver.observe(img));
    }
});

// Smooth Scroll for Anchor Links
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

// Form Validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        form.classList.add('was-validated');
    });
});

// Performance Monitoring
if (window.performance) {
    window.addEventListener('load', () => {
        const timing = window.performance.timing;
        const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
        console.log('Page load time:', pageLoadTime);
        // You can send this data to your analytics service
    });
}
// FAQ Accordion Functionality
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                // Toggle active class on the clicked item
                const isActive = item.classList.contains('active');
                
                // Close all items first
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    const faqAnswer = faqItem.querySelector('.faq-answer');
                    faqAnswer.style.maxHeight = null;
                });
                
                // If the clicked item wasn't active, open it
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
        
        // Open the first FAQ item by default
        if (faqItems.length > 0) {
            faqItems[0].classList.add('active');
            const firstAnswer = faqItems[0].querySelector('.faq-answer');
            firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
        }
    }
}

// Remove the duplicate loading of rental analysis script since it's already included in the HTML
// const rentalAnalysisScript = document.createElement('script');
// rentalAnalysisScript.src = 'js/rental-analysis.js';
// document.body.appendChild(rentalAnalysisScript);
// document.body.appendChild(rentalAnalysisScript); 