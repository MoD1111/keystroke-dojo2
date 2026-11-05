// Keystroke Dojo service worker
// Pages: network first, so new versions show up; cached copy when offline.
// App files: served from cache, refreshed in the background.
// Google Fonts: cached after the first online visit so the fonts also work offline.

const VERSION = 'v2';                      // bump this whenever you deploy changes
const APP_CACHE = `dojo-app-${VERSION}`;
const FONT_CACHE = 'dojo-fonts';

// Relative paths, so this works on a GitHub Pages project site (/repo-name/)
const APP_FILES = [
  './',
  './index.html',
  './kids.html',
  './style.css',
  './manifest.json',
  './manifest-kids.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_CACHE)
      .then(cache => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

// Remove caches from older versions
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(k => k.startsWith('dojo-app-') && k !== APP_CACHE)
        .map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Page navigations: try the network, fall back to the cached copy of that same page
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => {
          if (res.ok) { const copy = res.clone(); caches.open(APP_CACHE).then(c => c.put(req, copy)); }
          return res;
        })
        .catch(async () =>
          (await caches.match(req, { ignoreSearch: true })) ||
          caches.match(url.pathname.endsWith('kids.html') ? './kids.html' : './index.html'))
    );
    return;
  }

  // Google Fonts (stylesheet and font files): cache first
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONT_CACHE).then(cache =>
        cache.match(req).then(hit => hit || fetch(req).then(res => { cache.put(req, res.clone()); return res; }))
      )
    );
    return;
  }

  // Own files: serve from cache immediately, update the cache in the background
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(APP_CACHE).then(cache =>
        cache.match(req, { ignoreSearch: true }).then(hit => {
          const network = fetch(req)
            .then(res => { if (res.ok) cache.put(req, res.clone()); return res; })
            .catch(() => hit);
          return hit || network;
        })
      )
    );
  }
});
