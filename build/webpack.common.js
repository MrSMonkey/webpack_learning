
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
      },
      {
        test: /\.(jpg|png|gnf)$/,
        use: {
          loader: 'url-loader', 
          options: {
            name: '[name]_[hash].[ext]', // 输出文件名称配置
            outputPath: './images', // 输出路径配置
            // publicPath: 'assets/images',
            limit: 10240
          }
        },
      }, {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: './font', // 输出路径配置
          }
        },
      }
    ],
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    usedExports: true, // 引入Tree Shaking被使用的才导出
    splitChunks: { // 代码分割配置
      chunks: 'all', // async-只针对异步代码做代码分割； initial-只针对t同步代码做代码分割；all-无论同步或异步代码都会做代码分割打包（chunks配置需要与cacheGroups一起配合配置）
    },
  },
  output: {
    publicPath: './',
    filename: '[name].js', // 入口文件输出名字
    chunkFilename: '[name].chunk.js', // 被入口文件间接引用的文件的输出名字
    path: path.resolve(__dirname, '../dist'),
  },
}