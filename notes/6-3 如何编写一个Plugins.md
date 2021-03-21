## 如何编写一个Plugin（6-1 上半节）
plugin 可以再webpack运行到某个时刻的时候，帮你做一些事情，实现原理发布订阅的模式
1. 编写一个简单的plugin--在代码打包完成，放入dist文件夹之前生成一个copyright.txt文件，一起放入dist文件夹
```
// 步骤1.
npm i webpack webpack-cli -D

// 步骤2. 创建webpack.config.js
const path = require('path');
const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin.js');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  plugins: [
    new CopyrightWebpackPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  }
};

// 步骤3. 创建./plugins/copyright-webpack-plugin.js
class CopyrightWebpackPlugin {
  // compiler打包中所有的信息，配置信息等
  apply(compiler) {
    compiler.hooks // hooks[钩子]：值得是webpack打包过程中的不同阶段时暴露出来的钩子，我们可以利用这些钩子做一些处理
      .compile
      // 同步钩子的同步调用方式api
      .tap('CopyrightWebpackPlugin', (compilation) => { // compilation 只是这次打包的信息
        console.log('compile-step');
      });
    compiler.hooks
      .emit // emit: 将打包后的文件放入webpack.config.js中指定的output文件夹的时刻，这是一个异步的钩子
      // tapAsync异步钩子的同步调用方式api
      .tapAsync('CopyrightWebpackPlugin', (compilation, callback) => {
        compilation.assets['copyright.txt'] = {
          source: function() {
            return 'copyright by dell lee'; // 写入的文件内容
          },
          size: function () {
            return 28; // 设定文件大小
          }
        }
        callback();
      });
  }
}
module.exports = CopyrightWebpackPlugin;


// 步骤3. 运行npm run build
```

