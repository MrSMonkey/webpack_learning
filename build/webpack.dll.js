const Webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    vendors: ['lodash'],
    react: ['react', 'react-dom'],
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dll'),
    library: '[name]', // 将打包后的文件暴露出去，变量名为vendor
  },
  plugins: [
    new Webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '../dll/[name].manifest.json'),
    })
  ]
};