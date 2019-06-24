import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
// 布局css
import '../static/css/reset.css'
import '../static/css/cascade.css'

// import 'bootstrap-vue/dist/bootstrap-vue.css'
// element组件
import { Table, TableColumn, Button, Checkbox, Pagination, Input, Tabs, TabPane, Switch, Message, Col, Form as eleForm, FormItem, Loading, MessageBox, Row, Menu, MenuItem, MenuItemGroup, Submenu, Dropdown, DropdownMenu, DropdownItem, Tree } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// bootsrtap组件
Vue.use(BootstrapVue)
// element组件
Vue.use(Tree)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Checkbox)
Vue.use(Pagination)
Vue.use(Input)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Switch)
Vue.use(Col)
Vue.use(eleForm)
Vue.use(FormItem)
Vue.use(Loading.directive)
Vue.use(Row)
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
