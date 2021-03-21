## 如何编写一个Loader（6-1 上半节）
1. loader本身就是一个函数。
2. 实现一个简单的loader【6-1 上半节】
```
// 步骤1. 编写一个replaceLoader--如果编译过程中遇到一个'dell'字符串，就替换成'dellLee'
module.exports = function (source) {
  return source.replace('dell', 'dellLee');
}
// 步骤2. 引入replaceLoader,创建webpack.config.js
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
// 步骤3. 运行[npm run build]即可（6-1 上半节）
```

3. 通过webpack给loader传参【6-1 下半节】
```
// 修改webpack.config.js
...
module.exports = {
  ....
  module: {
    rules: [{
      rules: [{
        test: /\.js/,
        use: [
          {
            loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
            options: {
              name: 'lee',
            }
          }
        ]
      }]
    }]
  },
  ....
}
// ./loaders/replaceLoader.js

module.exports = function (source) {
  return source.replace('dell', this.query.name);
}

```
4. 通过loader-utils插件获取参数【6-1 下半节】
```
// 步骤1. 安装loader-utils
npm i loader-utils --save-dev

// 步骤2. ./loaders/replaceLoader.js
const loaderUtils = require('loader-utils');
module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  return source.replace('dell', options.name);
}
```
4. 通过loader callback【6-1 下半节】:实现编译结果和extra信息的返回
```
// ./loaders/replaceLoader.js
const loaderUtils = require('loader-utils');
module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  const result = source.replace('dell', options.name);
  return this.callback(null, result);
}
```
5. loader中的异步处理【6-2】
```
// ./loaders/replaceLoader.js
const loaderUtils = require('loader-utils');
module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  const callback = this.async();
  setTimeout(() => {
    const result = source.replace('dell', options.name);
    callback(null, result);
  }, 1000)
}
```
6. 同时引入多个loader--如果编译过程中遇到一个'dell'字符串，就替换成'lee',再将'lee'替换成'world'
```
// 步骤1. 将replaceLoader.js 重命名 replaceLoaderAsync.js
npm i loader-utils --save-dev

// 步骤2. 创建replaceLoader.jsconst loaderUtils = require('loader-utils');
module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  const result = source.replace('dell', options.name);
  return this.callback(null, result);
}

// 步骤3. 修改webpack.config.js
...
module.exports = {
  ....
  module: {
    rules: [{
      rules: [{
        test: /\.js/,
        use: [
          {
            loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
          },
          {
            loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
            options: {
              name: 'lee',
            }
          }
        ]
      }]
    }]
  },
  ....
}
```
* 编译过程中，loader的执行顺序是从下到上，从右到左

6. 如何实现如下方式引用loader
```
// webpack.config.js
...
module.exports = {
  ....
  module: {
    rules: [{
      rules: [{
        test: /\.js/,
        use: [
          {
            loader: 'replaceLoader', // 如何实现如下方式引用loader
          },
          {
            loader: 'replaceLoaderAsync',
            options: {
              name: 'lee',
            }
          }
        ]
      }]
    }]
  },
  ....
}


// webpack.config.js
...
module.exports = {
  ....
  resolveLoader: {
    modules: ['node_modules', './loaders']
  },
  ....
}

```

7. loader用途：多语言替换，异常监控