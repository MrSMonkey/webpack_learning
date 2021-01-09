const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  externals: ['lodash'], // 当你的库引用了第三方库时，可以通过此配置过滤第三方库，减小库文件的大小。但是在引用你的库时，就必须先引入lodash，并且引入lodash时的变量名必须为'lodash'，如：import lodash from 'lodash'
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    library: 'lib', // 生成一个存在window.lib全局变量的库文件，可以直接通过<script/>标签引用
    libraryTarget: 'umd', // 保证通过任何形式引用都可以实现对库的引用，import、require等,libraryTarget的值还可以为'this'、'window';NodeJs的环境libraryTarget的值还可以是'global'
  }
}