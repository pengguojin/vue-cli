import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    ipsList: [], // IPS来源统计图表
    wafList: [], // WAF来源统计图表
    socList: [], // SOC录入统计图表
    bxyList: [], // 北信源接口图表
    sealSelect: '' // 下拉
  },
  mutations,
  actions,
  getters: {
  }
})

export default store
