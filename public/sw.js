self.addEventListener('install', function(e){
  console.log('Service Worker installed');
});

self.addEventListener('activate', function(e){
  console.log('Service Worker Activated');
});

self.addEventListener('fetch', function(e){
  console.log('Service Worker Fetch: ', e.request);
});