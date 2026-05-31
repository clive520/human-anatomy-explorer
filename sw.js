const CACHE_NAME = 'anatomy-explorer-v1';
const ASSETS = [
  './',
  './index.html',
  './explorer.html',
  './teeth.html',
  './css/base.css',
  './css/components.css',
  './css/explorer.css',
  './js/app.js',
  './js/teeth_scene.js',
  './js/data/teeth.js',
  './assets/models/human_teeth_segmented_draco.glb'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        // Only cache valid responses
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(() => {
        // Ignore network errors (offline mode)
      });
      return cachedResponse || fetchPromise;
    })
  );
});
