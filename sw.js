"use strict";
var CACHE = "accountant-v5-20260815";

// On install: precache the app shell so offline launches work even before
// the first successful network fetch.
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) {
      return c.addAll(["./", "index.html"]).catch(function() {});
    })
  );
  self.skipWaiting();
});

// On activate: clean out old cache versions so stale copies never linger.
self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function(e) {
  var isNavigation = e.request.mode === "navigate";

  if (isNavigation) {
    // NETWORK-FIRST for the app page itself: online, you always get the
    // latest deployed version. Offline, falls back to whatever was last
    // cached (via the precache above or a previous successful visit).
    e.respondWith(
      fetch(e.request).then(function(res) {
        if (res && res.status === 200) {
          var clone = res.clone();
          caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
        }
        return res;
      }).catch(function() {
        return caches.match(e.request).then(function(cached) {
          return cached || caches.match("index.html").then(function(shell) {
            return shell || new Response("Offline", { status: 503 });
          });
        });
      })
    );
    return;
  }

  // CACHE-FIRST for everything else (icons, etc.) — fine to reuse since
  // these rarely change and this keeps things fast.
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached) return cached;
      return fetch(e.request).then(function(res) {
        if (!res || res.status !== 200 || res.type === "opaque") return res;
        var clone = res.clone();
        caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
        return res;
      }).catch(function() {
        return new Response("Offline", { status: 503 });
      });
    })
  );
});
