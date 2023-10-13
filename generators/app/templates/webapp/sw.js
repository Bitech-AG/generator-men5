const CACHE_NAME = `<%= id %>`;
const version = '<%= version %>';

const FALLBACKS = {
  //'/resources/sap/ui/core/messagebundle_de_DE.properties': '/resources/sap/ui/core/messagebundle_de.properties',
};

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    cache.keys().then(function(names) {
      for (let name of names) {
        cache.delete(name);
      }});
    cache.addAll([
      '/',
      '/resources',
      '/css',
      '/i18n'
    ]);

    /*
}); */
  })());
});

const getFallback = async (cache, request) => {
  const fallback = Object.keys(FALLBACKS).find(item => request.url.indexOf(item) >= 0);

  if (fallback) {
    return await fetch(FALLBACKS[fallback]);
  } 
};

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Get the resource from the cache.
    let cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
        try {
          // If the resource was not in the cache, try the network.
          let fetchResponse = await getFallback(cache, event.request);

          if (!fetchResponse) {
            fetchResponse = await fetch(event.request);
          }
          
          if (!event.request.url.startsWith('chrome-extension') && event.request.url.indexOf('/api') === -1) {
            cache.put(event.request, fetchResponse.clone());
          }
          
          // Save the resource in the cache and return it.
          return fetchResponse;
        } catch (e) {
          // The network failed.
          // there is nothing we can do, but we must always
          // return a Response object
          return new Response(e.message, {
            status: 408,
            headers: { "Content-Type": "text/plain" },
          });
        }
    }
  })());
});