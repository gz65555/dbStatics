import Vue from 'vue'
import VueRouter from 'vue-router';
import routerMap from './router';
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource);

/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// });

let router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  transitionOnLoad: true
});

let app = Vue.extend({});
routerMap(router);
router.start(app, "#app");
