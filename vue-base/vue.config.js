const path = require('path')

const resolve = dir => path.join(__dirname, dir);

const PUBLIC_PATH = process.env.NODE_ENV === 'production' ? '/venus' : '/'

module.exports = {
  devServer: {
    proxy: 'http://localhost:8761', //代理
    port: 8888
  },
  lintOnSave: false,
  publicPath: PUBLIC_PATH,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@c', resolve('src/components'))
      .set('@v', resolve('src/views'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false
}