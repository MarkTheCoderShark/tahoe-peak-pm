document.addEventListener('DOMContentLoaded', function() {
    // Get the existing popup and form elements
    const popupOverlay = document.getElementById('rental-analysis-popup');
    const form = document.getElementById('rental-analysis-form');
    const closeButton = popupOverlay.querySelector('.close-popup');
    
    // Create the success message element but don't add it to the DOM yet
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <h3>Thank You!</h3>
        <p>We've received your request for a free rental analysis. We'll contact you shortly to discuss your property.</p>
    `;
    // Don't append it yet to prevent it from showing prematurely
    
    // Add event listeners
    form.addEventListener('submit', handleSubmit);
    
    closeButton.addEventListener('click', closePopup);
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
    
    // Add click event to all "Get Free Analysis" buttons
    document.querySelectorAll('[data-action="open-rental-analysis"]').forEach(button => {
        button.addEventListener('click', openPopup);
    });
    
    // Handle form submission
    function handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        
        // Submit to Netlify
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData).toString()
        })
        .then(response => {
            if (response.ok) {
                // Only now append and show the success message
                if (!popupOverlay.querySelector('.success-message')) {
                    popupOverlay.querySelector('.popup-content').appendChild(successMessage);
                }
                
                // Show success message
                form.style.display = 'none';
                successMessage.classList.add('active');
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    form.reset();
                    form.style.display = 'block';
                    successMessage.classList.remove('active');
                    // Remove success message from DOM when done
                    if (popupOverlay.querySelector('.success-message')) {
                        popupOverlay.querySelector('.success-message').remove();
                    }
                    closePopup();
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting the form. Please try again.');
        });
    }
    
    // Open popup
    function openPopup() {
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Make sure the form is visible and success message is removed
        form.style.display = 'block';
        if (popupOverlay.querySelector('.success-message')) {
            popupOverlay.querySelector('.success-message').remove();
        }
    }
    
    // Close popup
    function closePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
        form.reset();
        form.style.display = 'block';
        
        // Remove success message when closing
        if (popupOverlay.querySelector('.success-message')) {
            popupOverlay.querySelector('.success-message').remove();
        }
    }
}); 