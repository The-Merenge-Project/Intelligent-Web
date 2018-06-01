
importScripts('/scripts/idb.js');
importScripts('/scripts/store.js');

var cacheName = 'v2';
var cacheFiles = [
    '/scripts/app.js',
    '/stylesheets/style.css',
    '/stylesheets/bootstrap.min.css',
    '/stylesheets/fontawesome-stars.css',
    '/scripts/bootstrap.min.js',
    '/scripts/jquery.barrating.js',
    '/scripts/index.js',
    'https://fonts.googleapis.com/css?family=Montserrat:400,700'
];

/**
 *  Service Worker installation: Adding all the files that are to be cached
 */

self.addEventListener('install', function (e) {
    console.log("[Service Worker] Installed");

    //Install event waits the promise
    e.waitUntil(

        caches.open(cacheName).then(function (cache) {

            console.log("[Service Worker] Caching cacheFiles");
            return cache.addAll(cacheFiles)
        })
    )
});

/**
 *  Service Worker activation: Clearing the old cache
 */

self.addEventListener('activate', function (e) {
    console.log("[Service Worker] Activated");

    //Clearing old cache
    e.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (thisCache) {

                if (thisCache !== cacheName){
                   console.log("[ServiceWorker] Removing Cached files from ", thisCache)
                    return caches.delete(thisCache);
                }

            }))
        })
    );

    // For fixing corner cases where service worker might not work
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    console.log("[Service Worker] Fetching in progress", e.request.url);

    // e.respondWith(
    //     caches.match(e.request).then(function (res) {
    //             if (res) {
    //                 console.log("[Service Worker] Found resource", e.request.url)
    //                 return res || fetch(event.request);
    //             }
    //
    //             var requestClone = e.request.clone();
    //
    //             fetch(requestClone)
    //                 .then(function (res) {
    //
    //                     if(!res){
    //                         console.log("[Service Worker] No response")
    //                         return res;
    //                     }
    //
    //                     var resClone = res.clone();
    //
    //                     caches.open(cacheName).then(function (cache) {
    //
    //                         cache.put(e.request, resClone);
    //                         return res;
    //
    //                     });
    //
    //                 })
    //             .catch(function (err) {
    //                 console.log("[Service Worker] Error while fetching and caching")
    //             });
    //
    //
    //             return fetch(e.request);
    //
    //         })
    // );
});

// self.addEventListener('sync', function(event) {
//     event.waitUntil(
//         store.outbox('readonly').then(function(outbox) {
//             return outbox.getAll();
//         }).then(function(messages) {
//             return Promise.all(messages.map(function(message) {
//                 return fetch('/users/login', {
//                     method: 'POST',
//                     body: message,
//                     headers: {
//                         'Accept': 'application/json',
//                         'X-Requested-With': 'XMLHttpRequest',
//                         'Content-Type': 'application/json'
//                     }
//                 }).then(function(response) {
//                     return response.json();
//                 }).then(function(data) {
//                     if (data.result === 'success') {
//                         return store.outbox('readwrite').then(function(outbox) {
//                             return outbox.delete(message.id);
//                         });
//                     }
//                 })
//             }))
//         }).catch(function(err) {
//             console.error(err);
//         })
//     );
// })