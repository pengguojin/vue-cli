/**
 * ajax请求封装方法
 */
import {baseUrl, tokenParm} from './application'
import axios from 'axios'

export default async (url, type = 'GET', body, headers) => {
  if (process.env.NODE_ENV === 'production') {
    axios.defaults.withCredentials = true
  }
  axios.defaults.baseURL = baseUrl
  if (type === 'GET') {
    if (process.env.NODE_ENV === 'production') {
      url += `&csrf_token=${tokenParm}`
    }
    const {data} = await axios.get(url)
    return data
  } else if (type === 'POST') {
    if (typeof body === 'object') { // 如果是function，则是FormData提交
      body.append('csrf_token', tokenParm)
    } else { // 否则是字符串
      body += `&csrf_token=${tokenParm}`
    }
    const {data} = await axios.post(url, body, { method: 'POST', headers })
    return data
  }
}
