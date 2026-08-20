// Alternative World service worker — offline reading: cache static assets + generated posts.
var CACHE = "lb-v9";
var STATIC = [
  "/",
  "/css/site.css",
  "/js/site.js",
  "/js/comments.js",
  "/generated/pygments.css"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(STATIC); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  if (url.origin !== location.origin) return;

  // Static assets: cache-first.
  if (STATIC.indexOf(url.pathname) !== -1 || /\.(css|js|png|svg|webmanifest)$/.test(url.pathname)) {
    e.respondWith(
      caches.match(e.request).then(function (hit) { return hit || fetch(e.request).then(function (res) { var cl = res.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, cl); }); return res; }); })
    );
    return;
  }

  // Pages & generated posts: network-first, cache fallback (offline reading).
  e.respondWith(
    fetch(e.request).then(function (res) {
      if (res.ok && /\/$|\/posts\/|\.html/.test(url.pathname)) {
        var cl = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, cl); });
      }
      return res;
    }).catch(function () { return caches.match(e.request); })
  );
});
