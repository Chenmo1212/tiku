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
      meta: {
        toHome: true    // 添加该字段，表示进入这个路由是需要条件的
      },
      //懒加载
      component: resolve => require(['@/components/chapter'], resolve),
    }, {
      path: '/detail',
      name: 'detail',
      meta: {
        toHome: true    // 添加该字段，表示进入这个路由是需要条件的
      },
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
      meta: {
        toHome: true    // 添加该字段，表示进入这个路由是需要条件的
      },
      //懒加载
      component: resolve => require(['@/components/overview'], resolve),
    }, {
      path: '/about',
      name: 'about',
      //懒加载
      component: resolve => require(['@/components/about'], resolve),
    }, {
      path: '/feedback',
      name: 'feedback',
      //懒加载
      component: resolve => require(['@/components/feedback'], resolve),
    }, {
      path: '/beforeExam',
      name: 'beforeExam',
      meta: {
        toHome: true    // 添加该字段，表示进入这个路由是需要条件的
      },
      //懒加载
      component: resolve => require(['@/components/exam/beforeExam'], resolve),
    }, {
      path: '/examDetail',
      name: 'examDetail',
      meta: {
        toHome: true    // 添加该字段，表示进入这个路由是需要条件的
      },
      //懒加载
      component: resolve => require(['@/components/exam/examDetail'], resolve),
    }, {
      path: '/examOverview',
      name: 'examOverview',
      meta: {
        toHome: true    // 添加该字段，表示进入这个路由是需要条件的
      },
      //懒加载
      component: resolve => require(['@/components/exam/examOverview'], resolve),
    }, {
      path: '/afterExam',
      name: 'afterExam',
      meta: {
        toHome: true    // 添加该字段，表示进入这个路由是需要条件的
      },
      //懒加载
      component: resolve => require(['@/components/exam/afterExam'], resolve),
    }, {
      path: '/todo',
      name: 'todo',
      //懒加载
      component: resolve => require(['@/components/todo'], resolve),
    }, {
      path: '/timeline',
      name: 'timeline',
      //懒加载
      component: resolve => require(['@/components/timeline'], resolve),
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
