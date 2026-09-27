// AIM service worker — offline reading: cache static assets + generated posts.
var CACHE = "lb-v20";
var STATIC = [
  "/css/app.css",
  "/css/site.css",
  "/js/site.js",
  "/js/comments.js",
  "/js/hero-orbits.js",
  "/js/vendor/three.module.min.js",
  "/js/layout-engine.js",
  "/js/page-layout.js?v=20260821a",
  "/js/vendor/pretext.esm.js",
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

  // Everything network-first, cache as offline fallback: clients always
  // get fresh assets after a deploy, no manual cache-version bump needed.
  e.respondWith(
    fetch(e.request).then(function (res) {
      if (res.ok) {
        var cl = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, cl); });
      }
      return res;
    }).catch(function () { return caches.match(e.request); })
  );
});
