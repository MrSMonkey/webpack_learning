const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.jpg$/,
      use: {
        loader: 'url-loader', 
        options: {
          name: '[name]_[hash].[ext]', // 输出文件名称配置
          outputPath: './images', // 输出路径配置
          limit: 102400
        }
      },
    }],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
}