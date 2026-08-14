"use strict";
var CACHE = "accountant-v4-20260814";

// On install: explicitly precache the app shell so offline launches work
// regardless of how the browser resolves the manifest's start_url.
// (Runtime caching below still catches anything else on first load.)
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) {
      return c.addAll([
        "./",
        "index.html"
      ]).catch(function() { /* best-effort — fetch handler below covers gaps */ });
    })
  );
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

// On fetch: serve from cache, fall back to network, cache successful responses.
// Navigation requests (opening the app) fall back to the cached app shell
// if the exact URL isn't in cache — this is the key fix for the white screen.
self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached) return cached;
      return fetch(e.request).then(function(res) {
        if (!res || res.status !== 200 || res.type === "opaque") return res;
        var clone = res.clone();
        caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
        return res;
      }).catch(function() {
        if (cached) return cached;
        // Offline and not an exact cache match: for page navigations,
        // fall back to the precached app shell instead of a blank "Offline" response.
        if (e.request.mode === "navigate") {
          return caches.match("index.html").then(function(shell) {
            return shell || new Response("Offline", { status: 503 });
          });
        }
        return new Response("Offline", { status: 503 });
      });
    })
  );
});
