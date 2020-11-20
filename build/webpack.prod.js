const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',// 开发环境：cheap-module-eval-source-map; 生产环境：cheap-module-source-map
  module: {
    rules: [
      { // webpack打包时，找到命中的文件后，使用loader编译文件时，use中的loader是倒序编译的，如scss编译时的执行顺序为：sass-loader，css-loader，style-loader
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
    ]
  },
  plugins: [
    
    new MiniCssExtractPlugin({
      filename: '[name].css', // 入口文件引用的css文件输出名字
      chunkFilename: '[name].chunk.css', // 非入口文件引用的css文件输出名字
    }),
  ],
  optimization:{
    minimizer: [new OptimizeCssAssetsWebpackPlugin({})] // css压缩插件
  }
}

module.exports = merge(commonConfig, prodConfig);