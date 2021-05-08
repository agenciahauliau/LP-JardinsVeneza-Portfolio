var CACHE_VERSION = 1;

// Identificador menor para uma versão específica do cache
var CURRENT_CACHES = {
  font: 'font-cache-v' + CACHE_VERSION
};

self.addEventListener('activate', function(event) {
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
    return CURRENT_CACHES[key];
  });

  // O worker não vai ser tratado como ativo até que a Promise se resolva.
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (expectedCacheNames.indexOf(cacheName) == -1) {
            console.log('Deletando cache expirado:', cacheName);

            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('Obtendo evento fetch para', event.request.url);

  event.respondWith(

    // Abre o objeto de cache que inicia com 'font'
    caches.open(CURRENT_CACHES['font']).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if (response) {
          console.log(' Encontrou resposta em cache:', response);

          return response;
        }
      }).catch(function(error) {

        // Trata exceções que vem de match() ou fetch().
        console.error('  Erro na handler:', error);

        throw error;
      });
    })
  );
});