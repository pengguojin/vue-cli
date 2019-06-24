/**
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * tokenParm：token认证字段
 * cookCred：是否发送cookie
 */
let baseUrl = ''
let tokenParm = ''
let cookCred = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:8888'
  tokenParm = ''
  cookCred = 'omit'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = '/usm'
  tokenParm = document.getElementById('sealToken').content // csrf_token
  cookCred = 'include'
}

export {
  baseUrl,
  tokenParm,
  cookCred
}
