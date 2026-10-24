/* Service worker de Bitácora PG: la app abre aunque no haya conexión.
   Los datos se sincronizan aparte con la caché sin conexión de Firestore. */
const CACHE = "bitacora-v5";
const SHELL = ["./", "./index.html", "./app/", "./app/index.html", "./app/firebase-config.js", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/favicon.svg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if(req.method !== "GET") return;
  const url = new URL(req.url);
  if(url.origin === location.origin){
    /* páginas: primero red (para recibir actualizaciones), si no hay, caché */
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return r; }).catch(() => caches.match(req).then(r => r || caches.match("./app/index.html"))));
  } else if(/fonts\.(googleapis|gstatic)\.com|gstatic\.com\/firebasejs/.test(url.href)){
    /* tipografías y SDK: caché primero */
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(resp => { const copy = resp.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return resp; })));
  }
});
