// Garante que o app e seus arquivos principais sejam sempre buscados direto
// do servidor (nunca de uma cópia guardada no celular) — sem isso, uma
// atualização publicada podia demorar até o navegador "decidir" checar de
// novo, e a virada de mês, a ordem das categorias etc. pareciam não ter
// mudado mesmo já corrigidas no código.
const NO_CACHE = [/index\.html$/, /support\.js$/, /stock-data\.js$/, /aquisicoes-data\.js$/, /manifest\.json$/];

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (event) => {
  const isNavigation = event.request.mode === 'navigate';
  const isCoreFile = NO_CACHE.some((re) => re.test(event.request.url));
  if (isNavigation || isCoreFile) {
    event.respondWith(fetch(event.request, { cache: 'no-store' }));
  }
});
