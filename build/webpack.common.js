const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const Webpack = require('webpack');
const fs = require('fs');
const plugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.html',
  }),
  new CleanWebpackPlugin(),
];
const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach((fileName) => {
  if(/.*\.dll\.js/.test(fileName)) {
    plugins.push(new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll', fileName),
    }));
  }
  if(/.*\.manifest\.json/.test(fileName)) {
    plugins.push(new Webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll', fileName),
    }));
  }
})
module.exports = {
  entry: {
    main: './src/index.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'], // 引入文件时省略文件后缀时，会优先匹配这两种格式
    alias: {
      delllee: path.resolve(__dirname, '../src/child'),
    },
    mainFiles: ['index', 'child'], // 默认优先引入文件夹下index.js，其次是child.js
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
  plugins,
  optimization: {
    usedExports: true, // 引入Tree Shaking被使用的才导出
    splitChunks: { // 代码分割配置
      chunks: 'all', // async-只针对异步代码做代码分割； initial-只针对t同步代码做代码分割；all-无论同步或异步代码都会做代码分割打包（chunks配置需要与cacheGroups一起配合配置）
    },
  },
  output: {
    publicPath: '/',
    filename: '[name].js', // 入口文件输出名字
    chunkFilename: '[name].chunk.js', // 被入口文件间接引用的文件的输出名字
    path: path.resolve(__dirname, '../dist'),
  },
}