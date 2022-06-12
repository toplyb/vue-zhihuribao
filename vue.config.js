const ENV = process.env.NODE_ENV

module.exports = {
  lintOnSave: ENV !== 'production',
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://101.201.227.166:7000',
        target: 'http://127.0.0.1:7000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
