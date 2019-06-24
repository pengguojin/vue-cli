/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 */

let baseUrl = ''
let routerMode = 'history'
let imgBaseUrl = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:8888'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://localhost:8888'
}

export {
  baseUrl,
  routerMode,
  imgBaseUrl
}
