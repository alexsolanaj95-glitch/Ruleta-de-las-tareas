// Ruleta de tareas v1.2: notificaciones + servir siempre la versión nueva del index
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const r = e.request;
  if(r.mode === "navigate" || r.destination === "document"){
    e.respondWith(fetch(r, { cache:"no-store" }).catch(() => fetch(r)));
  }
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type:"window", includeUncontrolled:true }).then(cs => {
    if(cs.length) return cs[0].focus();
    return self.clients.openWindow("./");
  }));
});
