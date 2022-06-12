const ENV = process.env.NODE_ENV

module.exports = {
  lintOnSave: ENV !== 'production',
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://zhihuapi.kuxiaosheng.com',
        // target: 'http://127.0.0.1:7000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
