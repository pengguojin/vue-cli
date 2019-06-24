export default {
  /* 获取图表数据-开始 */
  IPS_ECHART (state, arg) {
    state.ipsList = arg
  },

  WAF_ECHART (state, arg) {
    state.wafList = arg
  },
  SOC_ECHART (state, arg) {
    state.socList = arg
  },
  BXY_REPORT (state, arg) {
    state.bxyList = arg
  },
  /* 获取图表数据-结束 */

  // 获取下拉信息
  SELECTOR (state, arg) {
    state.sealSelect = arg.blacklist.status
  }
}
