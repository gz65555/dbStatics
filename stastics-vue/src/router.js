/**
 * Created by HuSong on 2016/9/23.
 */
'use strict'

export default function (router) {
  router.map({
    '/': {				//首页
      name: 'home',
      component: function (resolve) {
        require(['./views/Home.vue'], resolve);
      }
    },
    '/account': {
      name: 'account',
      component: function (resolve) {
        require(['./views/Account.vue'], resolve);
      }
    },
    '/role': {
      name: 'role',
      component: function (resolve) {
        require(['./views/Role.vue'], resolve);
      }
    },
    '/online-count': {
      name: 'online_count',
      component: function(resolve) {
        require(['./views/OnlineCount.vue'], resolve);
      }
    }
  })
}
