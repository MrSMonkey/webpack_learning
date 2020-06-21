const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',// 开发环境：cheap-module-eval-source-map; 生产环境：cheap-module-eval-source-map
  devServer: { // 实现后端调试
    port: 8081, // 自定义本地符占用的端口
    contentBase: './dist', // 本地服务器启动项目时，访问的目录。
    open: true, // 是否自动打开浏览器
    // hot: true, // Hot Module Replace热更新
    // hotOnly: true, // Hot Module Replace热更新失效时，webpack不做任何操作，默认时会刷新页面的
    proxy: {
      'api/': 'http://localhost:3000' // 异步数据请求代理转发地址
    }
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    usedExports: true, // 引入Tree Shaking被使用的才导出
  },
}

module.exports = merge(commonConfig, devConfig);