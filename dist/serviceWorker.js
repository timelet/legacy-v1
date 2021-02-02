import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';

import {CacheableResponsePlugin} from "../_snowpack/pkg/workbox-cacheable-response.js";
import {ExpirationPlugin} from "../_snowpack/pkg/workbox-expiration.js";
import {cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute} from "../_snowpack/pkg/workbox-precaching.js";
import {NavigationRoute, registerRoute} from "../_snowpack/pkg/workbox-routing.js";
import {CacheFirst, StaleWhileRevalidate} from "../_snowpack/pkg/workbox-strategies.js";
const SERVICE_WORKER_NAME = "Timelet Service Worker";
const SERVICE_WORKER_VERSION = __SNOWPACK_ENV__.SNOWPACK_PUBLIC_PACKAGE_VERSION;
const DEBUG_MODE = location.hostname === "127.0.0.1" || location.hostname === "localhost";
const DAY_IN_SECONDS = 24 * 60 * 60;
const MONTH_IN_SECONDS = DAY_IN_SECONDS * 30;
const YEAR_IN_SECONDS = DAY_IN_SECONDS * 365;
if (DEBUG_MODE) {
  console.debug(`${SERVICE_WORKER_NAME}:: Version ${SERVICE_WORKER_VERSION} loading...`);
}
cleanupOutdatedCaches();
const assetsToCache = self.__WB_MANIFEST;
if (DEBUG_MODE) {
  console.trace(`${SERVICE_WORKER_NAME}:: Assets that will be cached: `, assetsToCache);
}
precacheAndRoute(assetsToCache);
const defaultRouteHandler = createHandlerBoundToURL("/index.html");
const defaultNavigationRoute = new NavigationRoute(defaultRouteHandler, {});
registerRoute(defaultNavigationRoute);
registerRoute(/^https:\/\/fonts\.googleapis\.com/, new StaleWhileRevalidate({
  cacheName: "google-fonts-stylesheets"
}));
registerRoute(/^https:\/\/fonts\.gstatic\.com/, new CacheFirst({
  cacheName: "google-fonts-webfonts",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200]
    }),
    new ExpirationPlugin({
      maxAgeSeconds: YEAR_IN_SECONDS,
      maxEntries: 30,
      purgeOnQuotaError: true
    })
  ]
}));
registerRoute(/\.(?:js|map|css)$/, new StaleWhileRevalidate({cacheName: "style-script-cache"}));
registerRoute(/\.(?:png|gif|jpg|jpeg|svg)$/, new CacheFirst({
  cacheName: "images",
  plugins: [
    new ExpirationPlugin({
      maxEntries: 250,
      maxAgeSeconds: MONTH_IN_SECONDS,
      purgeOnQuotaError: true
    })
  ]
}));
addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    if (DEBUG_MODE) {
      console.trace(`${SERVICE_WORKER_NAME}:: New version became active`, assetsToCache);
    }
    self.skipWaiting();
  }
});
