/*
 * @Author: chenjie
 * @Date: 2022-05-11 19:46:51
 * @LastEditors: chenjie
 * @LastEditTime: 2022-05-22 20:41:45
 * @FilePath: \rabbit-shop\vue.config.js
 * @Description:
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
const path = require('path')
module.exports = {
  pluginOptions: {
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
    // webpack-dev-server开启可IP和域名访问权限。
    config.devServer.disableHostCheck(true)
  },
  // 这个是设置外部扩展 模块为 qc 变量命名为 QC 导入 qc 将不做打包
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  }
}
