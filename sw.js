const CACHE='phoenix-fitness-v040-install';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./neon-city.webp','./phoenix-sky.webp','./skill-pull.webp','./skill-dip.webp','./skill-lsit.webp','./skill-muscle.webp'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('phoenix-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));return;}
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(net=>{if(net.ok){const copy=net.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return net;})));
});
