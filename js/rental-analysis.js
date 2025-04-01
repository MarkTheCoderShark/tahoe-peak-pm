document.addEventListener('DOMContentLoaded', function() {
    // Get the existing popup and form elements
    const popupOverlay = document.getElementById('rental-analysis-popup');
    const form = document.getElementById('rental-analysis-form');
    const closeButton = popupOverlay.querySelector('.close-popup');
    
    // Add success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <h3>Thank You!</h3>
        <p>We've received your request for a free rental analysis. We'll contact you shortly to discuss your property.</p>
    `;
    popupOverlay.querySelector('.popup-content').appendChild(successMessage);
    
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
        
        // Show success message
        form.style.display = 'none';
        successMessage.classList.add('active');
        
        // Reset form after 3 seconds
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMessage.classList.remove('active');
            closePopup();
        }, 3000);
    }
    
    // Open popup
    function openPopup() {
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close popup
    function closePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
        form.reset();
        form.style.display = 'block';
        successMessage.classList.remove('active');
    }
}); 