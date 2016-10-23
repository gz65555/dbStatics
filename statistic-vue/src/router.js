/**
 * Created by HuSong on 2016/9/23.
 */
'use strict';

module.exports = [
  {				//首页
    path: '/',
    component: require('./views/Home.vue')
  },
  {
    path: '/account',
    component: require('./views/Account.vue')
  },
  {
    path: '/role',
    component: require('./views/Role.vue')
  },
  {
    path: '/top10',
    component: require('./views/Top10.vue')
  },
  {
    path: '/online-count',
    component: require('./views/OnlineCount.vue')
  }
];
