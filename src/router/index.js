import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import chapter from '@/components/chapter'
import detail from '@/components/Detail'
import overview from '@/components/overview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    }, {
      path: '/chapter',
      name: 'chapter',
      component: chapter
    }, {
      path: '/detail',
      name: 'detail',
      component: detail,
    }, {
      path: '/overview',
      name: 'overview',
      component: overview,
    }
  ]
})
