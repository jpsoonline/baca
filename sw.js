/* Service worker Rekap OS. Naikkan nomor V jika ingin memaksa cache lama dibuang. */
const V = 'rekapos-v1';
const PRE = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => Promise.all(PRE.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const putOk = (req, res) => { if (res && (res.ok || res.type === 'opaque')) { const c = res.clone(); caches.open(V).then(ch => ch.put(req, c)).catch(() => {}); } return res; };
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  const lib = u.hostname === 'cdnjs.cloudflare.com' || (u.hostname === 'www.gstatic.com' && u.pathname.startsWith('/firebasejs/'));
  if (lib) { // pustaka pihak ketiga: cache dulu
    e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => putOk(r, res))));
    return;
  }
  if (u.origin !== location.origin) return; // Firestore/Auth tidak disentuh
  e.respondWith(fetch(r).then(res => putOk(r, res)).catch(() =>
    caches.match(r, { ignoreSearch: true }).then(m => m || (r.mode === 'navigate' ? caches.match('index.html').then(x => x || caches.match('./')) : Response.error()))));
});
