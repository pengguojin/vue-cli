import Vue from 'vue'
import Router from 'vue-router'
import { routerMode } from '@/config/application'

const Main = r => require.ensure([], () => r(require('@/components/main')), 'Main')
const Login = r => require.ensure([], () => r(require('@/components/login/login')), 'Login')
const Register = r => require.ensure([], () => r(require('@/components/login/register')), 'Register')
const ForgotPass = r => require.ensure([], () => r(require('@/components/login/forgotPass')), 'ForgotPass')
const Dashboard = r => require.ensure([], () => r(require('@/components/plugins/dashboard')), 'Dashboard')
const LineChart = r => require.ensure([], () => r(require('@/components/echarts/lineChart')), 'LineChart')
const JobTask = r => require.ensure([], () => r(require('@/components/job/JobTask')), 'JobTask')
const CronExpress = r => require.ensure([], () => r(require('@/components/job/CronExpress')), 'CronExpress')
const AssetsList = r => require.ensure([], () => r(require('@/components/job/AssetsList')), 'AssetsList')
const User = r => require.ensure([], () => r(require('@/components/author/UserMain')), 'UserMain')
const Role = r => require.ensure([], () => r(require('@/components/author/RoleMain')), 'RoleMain')
const Permission = r => require.ensure([], () => r(require('@/components/author/PermissionMain')), 'PermissionMain')
Vue.use(Router)

export default new Router({
  mode: routerMode,
  routes: [
    // 登录页面
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        keepAlive: true
      }
    },
    // 注册页
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        keepAlive: true
      }
    },
    // 忘记密码页
    {
      path: '/forgotPass',
      name: 'ForgotPass',
      component: ForgotPass
    },
    // 主页
    {
      path: '/main',
      name: 'Main',
      component: Main,
      meta: {
        keepAlive: true // 缓存
      },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'lineChart',
          name: 'LineChart',
          component: LineChart
        },
        {
          path: 'jobTask',
          name: 'JobTask',
          component: JobTask
        },
        {
          path: 'cronExpress',
          name: 'CronExpress',
          component: CronExpress
        },
        {
          path: 'assetsList',
          name: 'AssetsList',
          component: AssetsList
        },
        {
          path: 'user',
          name: 'User',
          component: User
        },
        {
          path: 'role',
          name: 'Role',
          component: Role
        },
        {
          path: 'permission',
          name: 'Permission',
          component: Permission
        }
      ]
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
