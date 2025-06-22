/**
 * Service Worker for Bitcoin Trivia Platform
 * Enables offline play and improves performance
 */

const CACHE_NAME = 'bitcoin-trivia-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index-secure.html',
  '/main-menu.html',
  '/story-mode.html',
  '/challenge-mode.html',
  '/discussions.html',
  '/submit.html',
  '/js/security.js',
  '/data/all-questions.json',
  '/data/questions.json',
  '/data/schema.json'
];

// Install service worker and cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching app resources');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate service worker and clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch handler with network-first strategy for questions, cache-first for assets
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Parse URL
  const url = new URL(event.request.url);

  // Handle API/data requests with network-first strategy
  if (url.pathname.includes('/data/') || url.pathname.includes('.json')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response before caching
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        })
        .catch(() => {
          // If network fails, try cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // Handle static assets with cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response before caching
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
  );
});

// Background sync for question submissions
self.addEventListener('sync', event => {
  if (event.tag === 'submit-question') {
    event.waitUntil(submitPendingQuestions());
  }
});

// Submit pending questions when back online
async function submitPendingQuestions() {
  const cache = await caches.open('pending-submissions');
  const requests = await cache.keys();
  
  for (const request of requests) {
    try {
      const response = await fetch(request);
      if (response.ok) {
        await cache.delete(request);
      }
    } catch (error) {
      console.error('Failed to submit question:', error);
    }
  }
}

// Message handler for cache updates
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data.action === 'clearCache') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      })
    );
  }
});

// Periodic cache update (every 24 hours)
setInterval(() => {
  const criticalUrls = [
    '/data/all-questions.json',
    '/data/questions.json'
  ];
  
  criticalUrls.forEach(url => {
    fetch(url).then(response => {
      if (response.ok) {
        caches.open(CACHE_NAME).then(cache => {
          cache.put(url, response);
        });
      }
    }).catch(() => {
      console.log('Background update failed for:', url);
    });
  });
}, 24 * 60 * 60 * 1000); // 24 hours