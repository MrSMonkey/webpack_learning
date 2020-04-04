const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.jpg$/,
        use: {
          loader: 'url-loader', 
          options: {
            name: '[name]_[hash].[ext]', // 输出文件名称配置
            outputPath: './images', // 输出路径配置
            // publicPath: 'assets/images',
            limit: 10240
          }
        },
      }, { // webpack打包时，找到命中的文件后，使用loader编译文件时，use中的loader是倒序编译的，如scss编译时的执行顺序为：sass-loader，css-loader，style-loader
        test: /(\.scss$)|\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // importLoader: 2 为了让scss文件内部引用的scss文件打包时，也从postcss-loader开始执行。
              // 如果不配置，可能直接scss文件内部引用的scss文件会直接从css-loader开始执行，从而导致scss文件内部引用的scss文件样式不会被编译成浏览器可识别的css语法
              importLoader: 2,
            }
          },
          'sass-loader',
          'postcss-loader',
        ]
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
}