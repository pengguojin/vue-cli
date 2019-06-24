import axios from 'axios'
import { baseURL } from '@/config'

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = []
  }

  getBaseConfig() {
    const config = {
      baseUrl: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }

  interceptors(instance) {
    instance.interceptors.request.use(req => {
      //添加全局loading
      return req
    }, err => {
      return Promise.reject(err)
    })
    instance.interceptors.response.use(res => {
      return res
    }, err => {
      return Promise.reject(err)
    })
  }

  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getBaseConfig, options)
    return instance(options)
  }
}
export default HttpRequest