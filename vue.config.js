const path = require('path')
module.exports = {
  pluginOptions: {
    'vue/multi-word-component-names': 0,
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 自动注入到每个 less 文件或者 vue 组件中 style 标签中。
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10000 }))
  }
}
