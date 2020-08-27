import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      //懒加载
      component: resolve => require(['@/components/home'], resolve),
    }, {
      path: '/chapter',
      name: 'chapter',
      //懒加载
      component: resolve => require(['@/components/chapter'], resolve),
    }, {
      path: '/detail',
      name: 'detail',
      //懒加载
      component: resolve => require(['@/components/detail'], resolve),
    }, {
      path: '/cardDetail',
      name: 'cardDetail',
      //懒加载
      component: resolve => require(['@/components/cardDetail'], resolve),
    }, {
      path: '/overview',
      name: 'overview',
      //懒加载
      component: resolve => require(['@/components/overview'], resolve),
    },{
      path: '/about',
      name: 'about',
      //懒加载
      component: resolve => require(['@/components/about'], resolve),
    }, {
      path: '/feedback',
      name: 'feedback',
      //懒加载
      component: resolve => require(['@/components/feedback'], resolve),
    },
  ]
})
