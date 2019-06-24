export default [
  { // 登录页
    path: '/',
    name: 'login',
    props: true,
    component: () => import('@v/login/login')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@v/test/test')
  },
  { // 首页
    path: '/main',
    component: () => import('@v/main'),
    children: [
      {
        path: '',
        components: {
          user: () => import('@v/auth/user'),
          role: () => import('@v/auth/role'),
          menu: () => import('@v/auth/menu')
        }
      }
    ]
  },

]