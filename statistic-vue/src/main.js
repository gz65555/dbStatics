import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import "../static/css/bootstrap.min.css";
import "../static/css/dashboard.css";
import App from './App';
// import routes from "./router";
window.store = require("../static/js/store");
window.jQuery = window.$ = require('../static/js/jquery-1.11.1.min');
require('../static/js/bootstrap.min');

// Vue.use(VueRouter);
Vue.use(VueResource);

/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// });

// let router = new VueRouter({
//   routes: routes,
//   hashbang: true,
//   history: false,
//   saveScrollPosition: true,
//   transitionOnLoad: true
// });
//
// const app = new Vue({
//   el:"#app",
//   router
// });

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  el: '#app',
  render: h => h(App)
});
