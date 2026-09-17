// Service Worker di VignaPlanner Campo
// Obiettivo: rendere disponibile offline la "shell" dell'app (HTML/CSS/JS/icone)
// e la libreria Leaflet. I dati dei vigneti sono già offline di loro (salvati
// in localStorage dopo l'importazione del JSON). Le mappe (tile OSM/satellite)
// richiedono connessione: se già visitate in una zona, il browser potrebbe
// comunque averle già in cache HTTP, ma non è garantito offline al 100%.

const CACHE_NAME = 'vpm-shell-v18';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-180.png',
  './icons/icon-192-maskable.png',
  './icons/icon-512-maskable.png',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js',
  'https://unpkg.com/leaflet-rotate@0.2.8/dist/leaflet-rotate-src.js'
];

self.addEventListener('install', event=>{
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event=>{
  const req = event.request;
  // Le tile di mappa (openstreetmap/arcgis) e ogni chiamata GET: prova rete,
  // se fallisce prova la cache (cache-first solo per l'app shell).
  event.respondWith(
    caches.match(req).then(cached=>{
      if(cached) return cached;
      return fetch(req).then(res=>{
        // mette in cache solo risposte valide e stesso-origine/GET
        if(req.method==='GET' && res && res.status===200){
          const resClone = res.clone();
          caches.open(CACHE_NAME).then(cache=>cache.put(req, resClone)).catch(()=>{});
        }
        return res;
      }).catch(()=> cached);
    })
  );
});
