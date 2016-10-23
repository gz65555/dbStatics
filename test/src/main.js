// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './views/Account.vue'
import "../static/css/bootstrap.min.css";
import "../static/css/dashboard.css";
import VueRouter from 'vue-router';
window.store = require("../static/js/store");
window.jQuery = window.$ = require('../static/js/jquery-1.11.1.min');
require('../static/js/bootstrap.min');
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: require('./components/PageTemplate.vue'),
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: 'account',
          component: require('./views/Account.vue')
        }
      ]
    }
  ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
