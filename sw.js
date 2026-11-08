// Ruleta de tareas v2.8: notificaciones + servir siempre la versión nueva del index
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const r = e.request;
  if(r.mode === "navigate" || r.destination === "document"){
    e.respondWith(fetch(r, { cache:"no-store" }).catch(() => fetch(r)));
  }
});
// Al tocar el aviso hay que volver a la ventana de ESTA ruleta. En la misma web
// (alexsolanaj95-glitch.github.io) viven otras apps, como la Ruleta del curro o las tarifas,
// así que no vale «la primera ventana que haya»: se busca la que está dentro de esta carpeta.
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const casa = self.registration.scope;   // https://alexsolanaj95-glitch.github.io/Ruleta-de-las-tareas/
  e.waitUntil(self.clients.matchAll({ type:"window", includeUncontrolled:true }).then(cs => {
    const mia = cs.find(c => c.url.startsWith(casa));
    if(mia) return mia.focus().catch(() => self.clients.openWindow(casa));
    return self.clients.openWindow(casa);
  }));
});
