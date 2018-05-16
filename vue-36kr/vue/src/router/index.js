import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Animmate from '@/components/animate/anin'
import Keep from '@/components/keep/kps'
import Detail from '@/components/detail/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/anin',
      name: 'anin',
      component: Animmate,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/keep',
      name: 'keep',
      component: Keep,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    }
  ]
})
