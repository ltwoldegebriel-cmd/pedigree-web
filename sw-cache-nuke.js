/* Pedigree SW helper: on activate, drop every Cache Storage entry that is
 * not owned by the current workbox cacheId prefix. cleanupOutdatedCaches
 * alone only clears same-prefix leftovers, so older prefixes (e.g. CeYi1knB
 * era) can keep serving stale index-*.js forever. */
self.addEventListener('activate', (event) => {
  const keep = 'pedigree-p1-cold-density-v3';
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((name) => !String(name).includes(keep))
          .map((name) => caches.delete(name)),
      ),
    ),
  );
});
