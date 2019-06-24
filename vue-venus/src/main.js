/* 主入口 */
// 系统主要组件
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 布局css
import '../static/css/reset.css'
import '../static/css/cascade.css'
// bootstrap-vue组件
import { Form, FormInput, FormGroup, Modal, FormRadio, FormSelect, FormFile, FormTextarea } from 'bootstrap-vue/es/components'
import '../static/css/bootstrap.css'
// element组件
import { Table, TableColumn, Button, Checkbox, Pagination, Input, Tabs, TabPane, Switch, Message, Col, Form as eleForm, FormItem, Loading, MessageBox, Row, Menu, MenuItem, MenuItemGroup, Submenu, Select, Option, Container, Footer, Aside, Main, Header, Collapse, CollapseItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// echarts组件，按需加载
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
// 验证表单组件
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false
/** **************** 第三方组件 *****************/
// bootstrap组件
Vue.use(Form)
Vue.use(FormInput)
Vue.use(Modal)
Vue.use(FormGroup)
Vue.use(FormRadio)
Vue.use(FormSelect)
Vue.use(FormFile)
Vue.use(FormTextarea)
// element组件
Vue.use(Container)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Select)
Vue.use(Option)
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
// echarts组件
Vue.prototype.$echarts = echarts
// 验证组件
Vue.use(Vuelidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
