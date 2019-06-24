import {getIPS, getWaf, getSoc, selectVal, getBxyReport} from '@/config/getData'

export default {
  // 获取图表数据-开始
  IPS_ECHART ({commit}) {
    getIPS().then(res => commit('IPS_ECHART', res))
  },

  WAF_ECHART ({commit}) {
    getWaf().then(res => commit('WAF_ECHART', res))
  },
  SOC_ECHART ({commit}) {
    getSoc().then(res => commit('SOC_ECHART', res))
  },
  // 获取图表数据-结束
  // 北信源接口图表
  BXY_REPORT ({commit}) {
    getBxyReport().then(res => commit('BXY_REPORT', res))
  },
  SELECTOR ({commit}, arg) {
    selectVal(arg).then(res => commit('SELECTOR', res))
  }
}
