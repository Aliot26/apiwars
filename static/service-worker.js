const CACHE_NAME = 'tutaj';
console.log("service-worker");
// List of files which are store in cache.
let filesToCache = [
    '/',
    'index.html',
    'style/style.css',
    'script/main.js'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function (cache) {
                console.log("++++++");
                return cache.addAll(filesToCache);

            }).catch(function (err) {
            // Snooze errors...
            // console.error(err);
        })
    );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Этот метод анализирует запрос и
    // ищет кэшированные результаты для этого запроса в любом из
    // созданных сервис-воркером кэшей.
    caches.match(event.request)
      .then(function(response) {
        // если в кэше найдено то, что нужно, мы можем тут же вернуть ответ.
        if (response) {
          return response;
        }

        // Клонируем запрос. Так как объект запроса - это поток,
        // обратиться к нему можно лишь один раз.
        // При этом один раз мы обрабатываем его для нужд кэширования,
        // ещё один раз он обрабатывается браузером, для запроса ресурсов,
        // поэтому объект запроса нужно клонировать.
        var fetchRequest = event.request.clone();

        // В кэше ничего не нашлось, поэтому нужно выполнить загрузку материалов,
        // что заключается в выполнении сетевого запроса и в возврате данных, если
        // то, что нужно, может быть получено из сети.
        return fetch(fetchRequest).then(
          function(response) {
            // Проверка того, получили ли мы правильный ответ
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Клонирование объекта ответа, так как он тоже является потоком.
            // Так как нам надо, чтобы ответ был обработан браузером,
            // а так же кэшем, его нужно клонировать,
            // поэтому в итоге у нас будет два потока.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                // Добавляем ответ в кэш для последующего использования.
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

// self.addEventListener('fetch', function(event) {
//   // every request from our site, passes through the fetch handler
//   // I have proof
//   console.log('I am a request with url:', event.request.clone().url);
//   event.respondWith(
//     // check all the caches in the browser and find
//     // out whether our request is in any of them
//     caches.match(event.request)
//       .then(function(response) {
//         if (response) {
//           // if we are here, that means there's a match
//           //return the response stored in browser
//           return response;
//         }
//         // no match in cache, use the network instead
//         return fetch(event.request);
//       }
//     )
//   );
// });

// self.addEventListener('fetch', function (evt) {
//
//     evt.respondWith(
//         caches.match(evt.request)
//             .then(function (response) {
//                 return response || fetchAndCache(evt.request);
//             })
//     );
// });
//
// function fetchAndCache(url) {
//   return fetch(url)
//   .then(function(response) {
//     // Check if we received a valid response
//     if (!response.ok) {
//       throw Error(response.statusText);
//     }
//     return caches.open(CACHE_NAME)
//     .then(function(cache) {
//       cache.put(url, response.clone());
//       return response;
//     });
//   })
//   .catch(function(error) {
//     console.log('Request failed:', error);
//     // You could return a custom offline 404 page here
//   });
// }