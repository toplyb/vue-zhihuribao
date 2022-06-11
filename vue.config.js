const ENV = process.env.NODE_ENV
module.exports = {
  lintOnSave: ENV !== 'production',
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://zhihuapi.kuxiaosheng.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
