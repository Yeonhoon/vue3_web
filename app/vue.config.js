const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api':{
        target:'http://localhost:3000/api/',
        changeOrigin: true,
        pathRewrite: {"^/api": ''}
      }
    },
    // headers: {'Access-Control-Allow-Origin':'*'}
  },
  outputDir: '../server/public',
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})
