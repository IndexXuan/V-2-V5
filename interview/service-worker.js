/**
 *  my first service worker
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Mon 27 Feb 2017 03:17:35 PM CST
 */

/**
 * 首先在主页检测是否支持sw，然后注册sw.js
 * 然后在sw.js中，监听三个主要事件，都需要e.waitUntil来包裹执行
 *     * install, to deal with init and store all caches
 *     * activate, to deal with old caches or something
 *     * fetch, to deal with req & res
 */

const cacheName = 'devlab-service-worker-v2.561';
const filesToCache = [
    '/',
    '/static/img/ic_back_white.svg',
    '/static/img/offline.jpg',
    '/static/img/woodwall.jpg',
    '/static/css/offline.css',
    '/offline.html',
    '/about/',
    '/column/',
    '/column/developer.html',
    '/column/english.html',
    '/column/kotlin.html',
    '/column/monthbook.html',
    '/column/plugin.html',
    '/column/resourcecode.html',
    '/column/stickies.html',
    '/openapi/',
    '/openapi/splash.html',
    '/works/',
    '/code/2016/10/18/01/',
    '/code/2016/08/13/01/',
    '/code/2016/07/10/01/',
    '/code/2016/06/25/01/',
    '/code/2017/02/03/01/',
    '/code/2017/02/04/01/',
    '/code/2017/02/07/01/',
    '/code/2017/02/15/01/',
    '/code/2017/02/18/01/'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install')
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate')
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        console.log('[ServiceWorker] Removing old cache', key)
        if (key !== cacheName) {  
          return caches.delete(key)
        }  
      }))
    })  
  )
})

self.addEventListener('fetch', function(e) {

  var extendDataUrl = [
    '/api/requestcount.php',
    '/api/openapi.php'
  ];

  // var allDataUrl = extendDataUrl.concat(filesToCache);
  var allDataUrl = extendDataUrl;
  var requestIsDataApi = false;

  //如果是 API 请求，先网络后缓存
  for (count in extendDataUrl){
    if (e.request.url.indexOf(extendDataUrl[count]) > -1 ) {
      requestIsDataApi = true;
      e.respondWith(
        fetch(e.request)
        .then(function(response) {
          return caches.open(cacheName).then(function(cache){
            cache.put(e.request.url, response.clone()); 
            return response;
          });
        })
        .catch(function(){
          return caches.match(e.request.url);
        })
      );
      break;
    }
  }

  //一般资源请求，先缓存再网络再默认
  if (!requestIsDataApi){
    e.respondWith(
      caches.match(e.request).then(function(respond){
        return respond || fetch(e.request)
          .then(function(res){
            return caches.open(cacheName).then(function(cache){
              cache.put(e.request.url, res.clone()); 
              return res;
            });
          })
          .catch(function(){
            return caches.match('offline.html');
          });
      })
    )
  }

});

