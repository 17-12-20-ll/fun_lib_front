module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://192.168.0.104:8000/',
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  lintOnSave: false
};
