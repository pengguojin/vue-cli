import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import './plugins/element'
import Bus from './bus'
if (process.env.NODE_ENV !== 'production') require('./mock')

Vue.config.productionTip = false
Vue.prototype.$bus = Bus

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
