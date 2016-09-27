import Vue from 'vue'
import VueRouter from 'vue-router';
import routerMap from './router';
import VueResource from 'vue-resource';
import "../static/css/bootstrap.min.css";
import "../static/css/dashboard.css";
window.store = require("../static/js/store");
window.jQuery = window.$ = require('../static/js/jquery-1.11.1.min');
require('../static/js/bootstrap.min');

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
