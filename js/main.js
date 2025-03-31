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

    // Header scroll animations
    const headerTop = document.querySelector('.header-top');
    const zeroFees = document.querySelector('.zero-fees');
    let lastScroll = 0;
    const scrollThreshold = 100; // Adjust this value to control when the animation triggers

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Handle header animations
        if (currentScroll > scrollThreshold) {
            headerTop?.classList.add('hidden');
            zeroFees?.classList.add('hidden');
        } else {
            headerTop?.classList.remove('hidden');
            zeroFees?.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    });

    // Rental Analysis Popup
    const popup = document.getElementById('rental-analysis-popup');
    const openPopupBtn = document.getElementById('rental-analysis-btn');
    const closePopupBtn = document.querySelector('.close-popup');
    const form = document.getElementById('rental-analysis-form');

    if (popup && openPopupBtn && closePopupBtn && form) {
        // Open popup
        openPopupBtn.addEventListener('click', function() {
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        // Close popup
        closePopupBtn.addEventListener('click', function() {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close popup when clicking outside
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                popup.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Handle form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your request! We will contact you shortly.');
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
            form.reset();
        });
    }

    // Contact Form Submission
    const consultationForm = document.getElementById('consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                propertyAddress: document.getElementById('property-address').value,
                message: document.getElementById('message').value,
                contactPreference: document.getElementById('contact-preference').value
            };

            // Here you would typically send the data to your backend
            // For now, we'll just log it and show a success message
            console.log('Form submission:', formData);

            // Show success message
            alert('Thank you for your message! We will contact you shortly.');
            
            // Reset form
            consultationForm.reset();
        });
    }
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
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992 && nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
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