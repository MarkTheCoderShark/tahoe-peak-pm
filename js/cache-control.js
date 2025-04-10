/**
 * Cache Control Script for Tahoe Peak Property Management
 * 
 * This script ensures visitors get the most recent version of the website
 * by implementing version checking and forced reloads when needed.
 */

// Current site version - change this when making significant updates
const SITE_VERSION = '1.0.1';
const VERSION_STORAGE_KEY = 'tahoe_peak_site_version';

// Check if we need to clear cache and reload
function checkSiteVersion() {
    // Get stored version (if any)
    const storedVersion = localStorage.getItem(VERSION_STORAGE_KEY);
    
    // If no stored version or version is different, clear cache and reload
    if (!storedVersion || storedVersion !== SITE_VERSION) {
        // Store the current version
        localStorage.setItem(VERSION_STORAGE_KEY, SITE_VERSION);
        
        // Force reload if version changed (but not on first visit)
        if (storedVersion && storedVersion !== SITE_VERSION) {
            console.log(`Site updated from ${storedVersion} to ${SITE_VERSION}. Refreshing...`);
            
            // Clear browser cache for this site
            if ('caches' in window) {
                caches.keys().then(names => {
                    names.forEach(name => {
                        caches.delete(name);
                    });
                });
            }
            
            // Reload the page
            window.location.reload(true);
        }
    }
}

// Add timestamp to CSS and JS resources for cache busting
function addVersionToAssets() {
    const timestamp = SITE_VERSION.replace(/\./g, '');
    
    // Find all CSS and JS resources
    const resources = document.querySelectorAll('link[rel="stylesheet"], script[src]');
    
    // Add timestamp parameter to force reload when version changes
    resources.forEach(resource => {
        const isLink = resource.tagName.toLowerCase() === 'link';
        const url = isLink ? resource.href : resource.src;
        
        // Skip if already versioned or from external domains
        if (url && url.includes(window.location.hostname) && !url.includes('v=')) {
            const separator = url.includes('?') ? '&' : '?';
            const newUrl = `${url}${separator}v=${timestamp}`;
            
            if (isLink) {
                resource.href = newUrl;
            } else {
                resource.src = newUrl;
            }
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkSiteVersion();
    addVersionToAssets();
}); 