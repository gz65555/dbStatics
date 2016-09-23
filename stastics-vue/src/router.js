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
    '/hello': {
      name: 'hello',
      component: function (resolve) {
        require(['./components/Hello.vue'], resolve);
      }
    },
    '/home': {
      name: 'home',
      component:function (resolve) {
        require(['./views/Home.vue'], resolve);
      }
    }
  })
}
