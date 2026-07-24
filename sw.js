const VERSION = 'tokc-v9';
const SHELL = [
  './',
  'index.html',
  'app.js?v=9',
  'cards-data.js?v=9',
  'assets/okc-icons.otf',
  'assets/icon-192.png',
  'assets/icon-512.png',
  'manifest.webmanifest',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== 'tokc-cards').map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Card images from the official CDN: cache-first, cache as we go.
  if (url.hostname === 'cards.eerieidolgames.com') {
    e.respondWith(
      caches.open('tokc-cards').then(cache =>
        cache.match(e.request).then(hit =>
          hit || fetch(e.request).then(res => {
            if (res.ok) cache.put(e.request, res.clone());
            return res;
          })
        )
      )
    );
    return;
  }

  // App shell: network-first so updates land, cache fallback for offline.
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request, { ignoreSearch: true }))
    );
  }
});
