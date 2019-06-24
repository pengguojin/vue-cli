/**
 * ajax请求封装方法
 */
import {baseUrl} from './application'
import axios from 'axios'

export default async (url, type = 'GET', body, headers) => {
  // let token = localStorage.getItem('token')
  // axios.defaults.headers.common['Authorization'] = token
  if (process.env.NODE_ENV === 'production') {
    axios.defaults.withCredentials = true
  }
  axios.defaults.baseURL = baseUrl
  if (type === 'GET') {
    const {data} = await axios.get(url)
    return data
  } else if (type === 'POST') {
    const {data} = await axios.post(url, body)
    return data
  } else if (type === 'PUT') {
    const {data} = await axios.put(url, body)
    return data
  } else if (type === 'DELETE') {
    const {data} = await axios.delete(url, body)
    return data
  }
}
