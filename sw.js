const CACHE_NAME = 'tahoe-peak-v1';
const RUNTIME_CACHE = 'runtime-cache';

// Assets to cache on install
const urlsToCache = [
    '/',
    '/index.html',
    '/css/base.css',
    '/css/header.css',
    '/css/footer.css',
    '/css/hero.css',
    '/css/services.css',
    '/css/user-types.css',
    '/css/animations.css',
    '/js/main.js',
    '/images/tahoe-peak-logo.svg',
    '/images/hero-bg.jpg',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-512x512.png',
    '/manifest.json'
];

// Install event - cache core assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => cacheName.startsWith('tahoe-peak-'))
                    .filter(cacheName => cacheName !== CACHE_NAME)
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

// Fetch event - network first with cache fallback
self.addEventListener('fetch', event => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request)
                    .then(response => {
                        // Don't cache if not a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        caches.open(RUNTIME_CACHE)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // Return a fallback for offline pages
                        if (event.request.mode === 'navigate') {
                            return caches.match('/offline.html');
                        }
                    });
            })
    );
}); 