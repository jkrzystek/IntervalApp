const CACHE_NAME = 'interval-timer-v2';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1920&auto=format&fit=crop', // Forest / Break
    'https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=1920&auto=format&fit=crop'  // Workshop / Work
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            })
        ))
    );
});