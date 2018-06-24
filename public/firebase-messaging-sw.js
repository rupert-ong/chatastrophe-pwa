self.addEventListener('install', function(e){
});

self.addEventListener('activate', function(e){
});

self.addEventListener('fetch', function(e){
  // console.log('Service Worker Fetch: ', e.request);
});

/*
  Firebase Cloud Messaging works on the web by looking for a service worker and then 
  sending it a message (containing the notification details). The service worker 
  then displays the notification.
*/
importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId' : '552985306453'
});

// Firebase is up and running inside our service worker
console.log(firebase.messaging());