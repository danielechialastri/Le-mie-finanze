const CACHE='finanze-offline-v8',FILES=['./','./index.html','./style.css','./app.js','./manifest.webmanifest'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(a=>Promise.all(a.filter(x=>x.startsWith('finanze-')&&x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method==='GET')e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(v=>{if(v.ok)caches.open(CACHE).then(c=>c.put(e.request,v.clone()));return v}).catch(()=>caches.match('./index.html'))))});
