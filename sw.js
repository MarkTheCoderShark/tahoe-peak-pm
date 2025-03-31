const CACHE_NAME = 'tahoe-peak-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/owners.html',
    '/residents.html',
    '/rentals.html',
    '/resources.html',
    '/real-estate.html',
    '/agent-referrals.html',
    '/about.html',
    '/contact.html',
    '/pricing.html',
    '/css/base.css',
    '/css/header.css',
    '/css/footer.css',
    '/css/owners.css',
    '/css/residents.css',
    '/css/rentals.css',
    '/css/resources.css',
    '/css/real-estate.css',
    '/css/agent-referrals.css',
    '/css/about.css',
    '/css/contact.css',
    '/css/pricing.css',
    '/css/404.css',
    '/css/500.css',
    '/js/main.js',
    '/images/logo.png',
    '/images/lake-tahoe-hero.jpg',
    '/images/icons/icon-72x72.png',
    '/images/icons/icon-96x96.png',
    '/images/icons/icon-128x128.png',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-152x152.png',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-384x384.png',
    '/images/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    });
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
}); 