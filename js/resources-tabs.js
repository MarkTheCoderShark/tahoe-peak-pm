// Resources Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const resourceSections = document.querySelectorAll('.resource-section');
    
    // Check if we're on the resources page
    if (tabButtons.length > 0 && resourceSections.length > 0) {
        // Add click event listeners to each tab button
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the target section
                const targetId = this.getAttribute('data-target');
                
                // Hide all sections
                resourceSections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Show the target section
                document.getElementById(targetId).classList.add('active');
                
                // Update URL hash for direct linking
                window.location.hash = targetId;
            });
        });
        
        // Check for hash in URL on page load
        if (window.location.hash) {
            const hash = window.location.hash.substring(1);
            const targetButton = document.querySelector(`.tab-btn[data-target="${hash}"]`);
            
            // If hash matches a tab, activate it
            if (targetButton) {
                targetButton.click();
            }
        }
    }
}); 