/**
 * 请求参数封装方法
 */
import Fetch from './fetch'
import { baseUrl } from './application'

// ********************************************************通用方法************************************************************ */
// 下拉列表 type根据类型获取不同的下拉列表
export const selectVal = (type) => Fetch(`/api/valuemapping?type=${type | ''}`)

// ********************************************************自动封堵************************************************************ */
/** 获取自动封堵列表信息 */
export const getSealList = (currentPage, perPage, searchItem, sortBy, sortDesc) => {
  let values = searchItem.values
  let url = `/api/data/search/page?type=blacklist`
  url += `&page=${currentPage || 1}&rows=${perPage || this.perPage}`
  for (let field of searchItem.fields) {
    url += `&fields=${field}`
  }
  for (let operator of searchItem.operators) {
    url += `&operators=${operator}`
  }
  // 封装参数url
  let arr = []
  arr.push(values.startTime > 0 ? values.startTime.getTime() : '')
  arr.push(values.endTime > 0 ? values.endTime.getTime() : '')
  arr.push(values.ip)
  arr.push(values.cdevtype)
  arr.push(values.creator)
  arr.push(values.status)
  url += `&values=${arr.join('&values=')}`
  // 排序
  url += `&sidx=${sortBy == null ? 'synctime' : sortBy}&sord=${sortDesc}`
  return Fetch(url)
}

/** 保存自动封堵信息 */
export const saveSeal = (rowData) => {
  let starttime = typeof (rowData.starttime) === 'object' ? rowData.starttime.getTime() : new Date(rowData.starttime).getTime()
  let endtime = typeof (rowData.endtime) === 'object' ? rowData.endtime.getTime() : new Date(rowData.endtime).getTime()
  let param = `id=${rowData.id}&startTime=${starttime}&IP=${rowData.ip}&endTime=${endtime}&reason=${rowData.reason}&ipType=${rowData.ipType}`
  return Fetch('/api/backlist/add', 'POST', param, { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
}

// 获取自动封堵 推送状态
export const getSealStatus = () => Fetch('/api/block/scheduler/status?')

// 获取自动封堵 推送周期
export const getSealInterval = () => Fetch('/api/block/scheduler/interval?')

// 保存自动封堵 推送周期
export const saveSealInterval = (cycle) => Fetch(`/api/block/scheduler/interval?interval=${cycle === '' ? 0 : cycle}`)

// 变更自动封堵 推送状态
export const choseInterval = (arg) => Fetch(`/api/block/scheduler/${arg ? 'start' : 'stop'}?`)

// 自动封堵 导入
export const exportSeal = (file) => {
  var data = new FormData()
  data.append('filename', file)
  return Fetch(`/api/backlist/import`, 'POST', data, { 'Content-Type': 'multipart/form-data' })
}

// 自动封堵 导出
export const importSeal = (searchItem, currentPage, perPage) => {
  let values = searchItem.values
  let url = `${baseUrl}/api/data/search/export?type=blacklist`
  url += `&page=${currentPage || 1}&rows=${perPage || this.perPage}`
  for (let field of searchItem.fields) {
    url += `&fields=${field}`
  }
  for (let operator of searchItem.operators) {
    url += `&operators=${operator}`
  }
  // 封装参数url
  let arr = []
  arr.push(values.startTime > 0 ? values.startTime.getTime() : '')
  arr.push(values.endTime > 0 ? values.endTime.getTime() : '')
  arr.push(values.ip)
  arr.push(values.cdevtype)
  arr.push(values.creator)
  arr.push(values.status)
  url += `&values=${arr.join('&values=')}`
  console.log(url)
  return url
}

// 自动封堵-解封
export const deblock = (ids) => Fetch(`/api/block/delbk?ids=${ids}`)

/** ** 自动封堵图表-开始 ****/
export const getIPS = () => {
  return getUrl('blacklist_ips')
}
export const getWaf = () => {
  return getUrl('blacklist_waf')
}
export const getSoc = () => {
  return getUrl('blacklist_soc')
}
// eslint-disable-next-line space-before-function-paren
function getUrl(type) {
  let nowTime = (new Date()).getTime()
  let oldTime = new Date()
  oldTime.setSeconds(0)
  oldTime.setHours(0)
  oldTime.setMinutes(0)
  oldTime.setMilliseconds(0)
  oldTime = oldTime.getTime() - 1000 * 60 * 60 * 24 * 6
  let url = `/api/data/query?type=${type}&startTime=${oldTime}&endTime=${nowTime}`
  return Fetch(url)
}
/** ** 自动封堵图表-结束 ****/

// 获取-操作说明
export const getHelp = () => Fetch('/api/block/usage?')

// 保存-操作说明
export const savHelp = (text) => Fetch(`/api/block/usage/update`, 'POST', `text=${encodeURIComponent(text)}`, { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })

// 自动封堵-删除
export const deleteSeal = (ids) => Fetch(`/api/backlist/delete?ids=${ids}`)

// ********************************************************安全日报************************************************************ */
// 获取安全日报列表
export const getReportList = (startTime, endTime, currentPage, perPage, filename) => Fetch(`/api/dailyreport/page?endTime=${endTime > 0 ? endTime.getTime() : ''}&startTime=${startTime > 0 ? startTime.getTime() : ''}&page=${currentPage}&rows=${perPage}&filename=${filename}`)

// 导出安全日报
export const exportReport = (startTime, endTime, filetype) => `${baseUrl}/api/dailyreport/export?endTime=${endTime > 0 ? endTime.getTime() : ''}&startTime=${startTime > 0 ? startTime.getTime() : ''}&filetype=${filetype}`

// 启动/停止安全日报邮件任务：type-start/stop
export const startStopReport = (type) => Fetch(`/api/dailyreport/mailtask/${type ? 'start' : 'stop'}?`)

// 获取安全日报配置信息/api/dailyreport/config
export const getReportConfig = () => Fetch(`/api/dailyreport/config?`)

// 更新安全日报配置信息
export const updateReportConfig = (form) => Fetch(`/api/dailyreport/config/update?`,
  'POST',
  `jobminute=${form.jobminute}&jobhour=${form.jobhour}&recipients=${form.mailConfig.recipients}&subject=${form.mailConfig.subject}&body=${form.mailConfig.body}&host=${form.mailConfig.host}&port=${form.mailConfig.port}&user=${form.mailConfig.user}&password=${form.mailConfig.password}&ssl=${form.mailConfig.ssl}`,
  { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })

// 测试安全日报邮件配置
export const testReport = () => Fetch('/api/dailyreport/config/mailtest?')

// ********************************************************北信源************************************************************ */
// 北信源图表
export const getBxyReport = () => Fetch(`/api/data/query?type=statistic_info`)
// 北信源列表
export const getBxyList = (currentPage, perPage) => Fetch(`/api/data/search/page?type=terminal_info_page&page=${currentPage}&rows=${perPage}`)

// ********************************************************安全通报************************************************************ */
// 通报列表
export const getWorkList = (pageSize, pageNumber) => Fetch(`/work/list?pageSize=${pageSize}&pageNumber=${pageNumber}`)
// 通报列表
export const getWorkDetail = (id) => Fetch(`/work/detail?id=${id}`)
// 子通报
export const getWorkItemList = (id) => Fetch(`/work/item?relateId=${id}`)
// 保存通报，子通报
export const saveWork = (data, url) => {
  let param = ''
  for (let d in data) {
    if (d === 'complate_time' || d === 'begin_time') {
      let time = new Date(data[d]).getTime()
      param += `${d}=${time}&`
    } else {
      param += `${d}=${data[d]}&`
    }
  }
  return Fetch(url, 'POST', param, { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
}

// 角色列表
export const getRoleList = () => Fetch(`/work/role?`)
// export const getDailyDetail = (id) => Fetch(`/works/detail?id=${id}`)
