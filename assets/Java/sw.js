var CACHE_VERSION = 1,
	CURRENT_CACHES = { font: 'font-cache-v' + CACHE_VERSION };
self.addEventListener('activate', function (e) {
	var n = Object.keys(CURRENT_CACHES).map(function (e) {
		return CURRENT_CACHES[e];
	});
	e.waitUntil(
		caches.keys().then(function (e) {
			return Promise.all(
				e.map(function (e) {
					if (-1 == n.indexOf(e)) return console.log('Deletando cache expirado:', e), caches.delete(e);
				})
			);
		})
	);
}),
	self.addEventListener('fetch', function (e) {
		console.log('Obtendo evento fetch para', e.request.url),
			e.respondWith(
				caches.open(CURRENT_CACHES.font).then(function (n) {
					return n
						.match(e.request)
						.then(function (e) {
							if (e) return console.log(' Encontrou resposta em cache:', e), e;
						})
						.catch(function (e) {
							throw (console.error('  Erro na handler:', e), e);
						});
				})
			);
	});
