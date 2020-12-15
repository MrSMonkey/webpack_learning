const Webpack = require('webpack');
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
  module: {
    rules: [
      { // webpack打包时，找到命中的文件后，使用loader编译文件时，use中的loader是倒序编译的，如scss编译时的执行顺序为：sass-loader，css-loader，style-loader
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // importLoader: 2 为了让scss文件内部引用的scss文件打包时，也从postcss-loader开始执行。
              // 如果不配置，可能直接scss文件内部引用的scss文件会直接从css-loader开始执行，从而导致scss文件内部引用的scss文件样式不会被编译成浏览器可识别的css语法
              importLoaders: 2,
              // modules: true, // css modules,防止class重名，导致css样式污染；通过模块化的方式引入css
            }
          },
          'sass-loader',
          'postcss-loader',
        ]
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ]
      },
    ]
  },
  plugins:[
    new Webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].js', // 入口文件输出名字
    chunkFilename: '[name].js', // 被入口文件间接引用的文件的输出名字
  },
}

module.exports = merge(commonConfig, devConfig);