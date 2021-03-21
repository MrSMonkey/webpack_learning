## 如何编写一个Loader
1. loader本身就是一个函数；
2. 编写一个replaceLoader--如果编译过程中遇到一个'dell'字符串，就替换成'dellLee'
```
module.exports = function (source) {
  return source.replace('dell', 'dellLee');
}
```
3. 引入replaceLoader
```
// 创建webpack.config.js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [{
      rules: [{
        test: /\.js/,
        use: [
          path.resolve(__dirname, './loaders/replaceLoader.js')
        ]
      }]
    }]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}
```
4. 运行[npm run build]即可