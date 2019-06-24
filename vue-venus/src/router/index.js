/**
 * 路由
 */
import Vue from 'vue'
import Router from 'vue-router'

const Automatic = r => require.ensure([], () => r(require('@/components/auto/Automatic')), 'Automatic')
const BxyMain = r => require.ensure([], () => r(require('@/components/auto/bxy/BxyMain')), 'BxyMain')
const WorkMain = r => require.ensure([], () => r(require('@/components/auto/work/WorkMain')), 'WorkMain')
// 工单主页
const AllWork = r => require.ensure([], () => r(require('@/components/auto/work/AllWork')), 'AllWork')
// 我提交的安全通报
const MeWork = r => require.ensure([], () => r(require('@/components/auto/work/MeWork')), 'MeWork')
// 我处理的安全通报
const DealWork = r => require.ensure([], () => r(require('@/components/auto/work/DealWork')), 'DealWork')
// 新建安全通报
const NewWork = r => require.ensure([], () => r(require('@/components/auto/work/NewWork')), 'NewWork')
// 新建安全通报
const DailyWork = r => require.ensure([], () => r(require('@/components/auto/work/DailyWork')), 'DailyWork')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Automatic',
      component: Automatic
    },
    {
      path: '/bxy',
      name: 'BxyTable',
      component: BxyMain
    },
    {
      path: '/work',
      name: 'WorkMain',
      component: WorkMain,
      children: [
        {
          path: '/work/all',
          name: 'AllWork',
          component: AllWork
        },
        {
          path: '/work/me',
          name: 'MeWork',
          component: MeWork
        },
        {
          path: '/work/deal',
          name: 'DealWork',
          component: DealWork
        },
        {
          path: '/work/new',
          name: 'NewWork',
          component: NewWork
        },
        {
          path: '/work/daily',
          name: 'DailyWork',
          component: DailyWork
        }
      ]
    }
  ]
})
