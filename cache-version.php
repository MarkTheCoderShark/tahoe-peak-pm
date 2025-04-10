<?php
/**
 * Cache Version Control for Tahoe Peak Property Management
 * 
 * Include this file at the top of your PHP files to implement automatic
 * cache-busting through version parameters.
 * 
 * Usage: <?php include 'cache-version.php'; ?>
 */

// Current site version - update this when making significant changes
define('SITE_VERSION', '1.0.1');

/**
 * Adds version parameter to asset URLs for cache busting
 * 
 * @param string $path Path to the asset (CSS, JS, images, etc.)
 * @return string Path with version parameter added
 */
function versioned_asset($path) {
    $version = str_replace('.', '', SITE_VERSION);
    $separator = strpos($path, '?') !== false ? '&' : '?';
    return $path . $separator . 'v=' . $version;
}

/**
 * Sets cache control headers to ensure fresh content
 */
function set_cache_control_headers() {
    // Set cache control headers
    header('Cache-Control: no-store, must-revalidate');
    header('Pragma: no-cache');
    header('Expires: 0');
}

// Only set headers for HTML content, not for assets
$request_uri = $_SERVER['REQUEST_URI'] ?? '';
$path_info = pathinfo($request_uri);
$extension = strtolower($path_info['extension'] ?? '');

// Apply strict cache control only to HTML/PHP files, not to assets
if (empty($extension) || $extension === 'php' || $extension === 'html') {
    set_cache_control_headers();
}
?> 