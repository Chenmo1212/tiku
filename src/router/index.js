import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      //懒加载
      component: resolve => require(['@/views/home'], resolve),
    }, {
      path: '/chapter',
      name: 'chapter',
      meta: {
        toHome: true    // 添加该字段，表示进入这个路由是需要条件的
      },
      //懒加载
      component: resolve => require(['@/views/chapter'], resolve),
    }, {
      path: '/detail',
      name: 'detail',
      meta: {
        toHome: true    // 添加该字段，表示进入这个路由是需要条件的
      },
      //懒加载
      component: resolve => require(['@/views/detail'], resolve),
    }, {
      path: '/cardDetail',
      name: 'cardDetail',
      //懒加载
      component: resolve => require(['@/views/cardDetail'], resolve),
    }, {
      path: '/overview',
      name: 'overview',
      meta: {
        toHome: true    // 添加该字段，表示进入这个路由是需要条件的
      },
      //懒加载
      component: resolve => require(['@/views/overview'], resolve),
    }, {
      path: '/music',
      name: 'music',
      //懒加载
      component: resolve => require(['@/views/music'], resolve),
    }, {
      path: '/about',
      name: 'about',
      //懒加载
      component: resolve => require(['@/views/about'], resolve),
    }, {
      path: '/feedback',
      name: 'feedback',
      //懒加载
      component: resolve => require(['@/views/feedback'], resolve),
    }, {
      path: '/beforeExam',
      name: 'beforeExam',
      meta: {
        toHome: true    // 添加该字段，表示进入这个路由是需要条件的
      },
      //懒加载
      component: resolve => require(['@/views/exam/beforeExam'], resolve),
    }, {
      path: '/examDetail',
      name: 'examDetail',
      meta: {
        toHome: true    // 添加该字段，表示进入这个路由是需要条件的
      },
      //懒加载
      component: resolve => require(['@/views/exam/examDetail'], resolve),
    }, {
      path: '/examOverview',
      name: 'examOverview',
      meta: {
        toHome: true    // 添加该字段，表示进入这个路由是需要条件的
      },
      //懒加载
      component: resolve => require(['@/views/exam/examOverview'], resolve),
    }, {
      path: '/afterExam',
      name: 'afterExam',
      meta: {
        toHome: true    // 添加该字段，表示进入这个路由是需要条件的
      },
      //懒加载
      component: resolve => require(['@/views/exam/afterExam'], resolve),
    }, {
      path: '/todo',
      name: 'todo',
      //懒加载
      component: resolve => require(['@/views/todo'], resolve),
    }, {
      path: '/timeline',
      name: 'timeline',
      //懒加载
      component: resolve => require(['@/views/timeline'], resolve),
    }, {
      path: '/moreSetting',
      name: 'moreSetting',
      //懒加载
      component: resolve => require(['@/views/moreSetting'], resolve),
    }, {
      path: '*',
      redirect: '/home'
    },
  ]
})

//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
