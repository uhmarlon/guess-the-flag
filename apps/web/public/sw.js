if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>n(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-8c8aeaed"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"e03653e6f8d8d69fccaac13f63ed7b0d"},{url:"/_next/static/0AT7nhdqEnTQQ2mus8sxk/_buildManifest.js",revision:"4e60b5a87aa38d159bc99aebf274794b"},{url:"/_next/static/0AT7nhdqEnTQQ2mus8sxk/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/288-0c27748ceca9921e.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/chunks/315-df8f3f655d1682bf.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/chunks/349-d2a01b971c3e7137.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/chunks/3b7a6b81-e7346e1efa1b98b5.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/chunks/945-5384da85dd48c7ec.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/chunks/954-53dd0c0c1accab5f.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/chunks/a0eb5bce-8b259799f5b9ba15.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/chunks/app/_not-found/page-2d56f05fa852b975.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/chunks/app/game/multi/flag/%5Bid%5D/page-2872dd017a4cd0f8.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/chunks/app/game/multi/flag/page-0f1b25bdf526ef11.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/chunks/app/join/page-22d0f824dacb572b.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/chunks/app/layout-daa904f8d3c8056f.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/chunks/app/my/page-2d9ae8b7687075f7.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/chunks/app/page-1d8cc32d85dbb277.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/chunks/framework-e905d71c214c6f2b.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/chunks/main-1ffb2893dc707fd7.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/chunks/main-app-9b3d804ce209e4c6.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/chunks/pages/_app-2a7ed43d073379ff.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/chunks/pages/_error-442f6ae8906ba122.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-247f6d15d649c3de.js",revision:"0AT7nhdqEnTQQ2mus8sxk"},{url:"/_next/static/css/0a632ee46b1afab9.css",revision:"0a632ee46b1afab9"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/flag.webp",revision:"92eebf76257e8bca0843069becf97418"},{url:"/icon/icon-192x192.png",revision:"7f5411873a90abe5df13785b41787aca"},{url:"/icon/icon-256x256.png",revision:"59c06ec4618cef8659d249beaf567be2"},{url:"/icon/icon-384x384.png",revision:"d96bc208030526e866d85fe4eb6d4ef8"},{url:"/icon/icon-512x512.png",revision:"1701af5449430e1d5d68f8bc5b54f2b5"},{url:"/icon/logo.png",revision:"284ffad796a4b91c7c7d9d9a70227c59"},{url:"/manifest.json",revision:"d18140ea9fa76834f142f197f55492ec"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
