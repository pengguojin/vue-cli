// 路由
import Vue from 'vue'
import Router from 'vue-router'
import { routerMode } from '@/config/application'

const Index = r => require.ensure([], () => r(require('@/components/index')), 'Index')
const Main = r => require.ensure([], () => r(require('@/components/main')), 'Main')
const ClassMain = r => require.ensure([], () => r(require('@/components/class/ClassMain')), 'ClassMain')
const FindMain = r => require.ensure([], () => r(require('@/components/find/FindMain')), 'FindMain')
const CarMain = r => require.ensure([], () => r(require('@/components/car/CarMain')), 'CarMain')
const MeMain = r => require.ensure([], () => r(require('@/components/me/MeMain')), 'MeMain')
const Order = r => require.ensure([], () => r(require('@/components/order/Order')), 'Order')
const MeSet = r => require.ensure([], () => r(require('@/components/me/MeSet')), 'MeSet')
const MeCoupon = r => require.ensure([], () => r(require('@/components/me/service/MeCoupon')), 'MeCoupon')
const MeInvitation = r => require.ensure([], () => r(require('@/components/me/service/MeInvitation')), 'MeInvitation')
const MeSign = r => require.ensure([], () => r(require('@/components/me/service/MeSign')), 'MeSign')
const Detail = r => require.ensure([], () => r(require('@/components/detail/DetailMain')), 'Detail')

Vue.use(Router)

export default new Router({
  mode: routerMode,
  routes: [
    {
      // 主页-入口
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        keepAlive: true // 缓存
      },
      children: [
        { // 首页
          path: 'main',
          name: 'Main',
          component: Main,
          meta: {
            keepAlive: true
          }
        },
        { // 分类
          path: 'classMain',
          name: 'ClassMain',
          component: ClassMain,
          meta: {
            keepAlive: true
          }
        },
        { // 发现
          path: 'findMain',
          name: 'FindMain',
          component: FindMain,
          meta: {
            keepAlive: true
          }
        },
        { // 购物车
          path: 'carMain',
          name: 'CarMain',
          component: CarMain,
          meta: {
            keepAlive: true
          }
        },
        { // 我的
          path: 'meMain',
          name: 'MeMain',
          component: MeMain,
          meta: {
            keepAlive: true
          }
        }
      ]
    },
    {
      // 商品明细
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    { // 订单明细
      path: '/order',
      name: 'Order',
      component: Order
    },
    { // 用户信息
      path: '/meSet',
      name: 'MeSet',
      component: MeSet
    },
    { // 优惠卷
      path: '/meCoupon',
      name: 'MeCoupon',
      component: MeCoupon
    },
    { // 邀请好友
      path: '/meInvitation',
      name: 'MeInvitation',
      component: MeInvitation
    },
    { // 签到领币
      path: '/meSign',
      name: 'MeSign',
      component: MeSign
    }
  ],
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
