import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import chapter from '@/components/chapter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },{
      path: '/chapter',
      name: 'chapter',
      component: chapter
    }
  ]
})
