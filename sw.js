"use strict";
var CACHE = "accountant-v3-20260709";

// On install: activate immediately. Actual caching happens via
// the fetch handler below, the first time each resource loads.
self.addEventListener("install", function(e) {
  self.skipWaiting();
});

// On activate: clean old caches
self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

// On fetch: serve from cache, fall back to network, cache successful responses
self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached) return cached;
      return fetch(e.request).then(function(res) {
        if (!res || res.status !== 200 || res.type === "opaque") return res;
        var clone = res.clone();
        caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
        return res;
      }).catch(function() { return cached || new Response("Offline", {status: 503}); });
    })
  );
});
