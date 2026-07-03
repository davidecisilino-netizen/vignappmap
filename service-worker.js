// Service worker minimale per VignaApp Map
// Scopo: 1) rendere l'app installabile (PWA) 2) farla funzionare anche senza rete in vigna,
// dato che i dati veri restano su localStorage/IndexedDB nel browser, non qui.

const CACHE_NAME = 'vignaapp-v1';
const APP_SHELL = [
  './VignApp_Map_v5_6.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Strategia: network-first per l'HTML principale (per prendere sempre gli aggiornamenti quando c'è rete),
// cache-first per tutto il resto (font, icone) cosi' funziona offline in campo.
self.addEventListener('fetch', event => {
  const req = event.request;
  const isAppHtml = req.mode === 'navigate' || req.url.endsWith('VignApp_Map_v5_6.html');

  if (isAppHtml) {
    event.respondWith(
      fetch(req)
        .then(res => {
          caches.open(CACHE_NAME).then(cache => cache.put(req, res.clone()));
          return res;
        })
        .catch(() => caches.match(req).then(cached => cached || caches.match('./VignApp_Map_v5_6.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      caches.open(CACHE_NAME).then(cache => cache.put(req, res.clone()));
      return res;
    }).catch(() => cached))
  );
});
