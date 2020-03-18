module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://chongyantech.xyz:9999/',
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
