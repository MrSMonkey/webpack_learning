## 5-1 library的打包（如何用webpack打包自己造的轮子？）

1. 将自己的轮子上传到npm网站，供别人使用
```
// package.json
{
  ...
  main: './dist/library.js', //将main指向我们打包后的文件
  ...
}

// 在npm官网注册一个自己的账户，在本地运行如下命令：
npm adduser

// 输入自己的账户名、密码、邮箱，在运行命令：
npm publish

```


## 5-2 PWA的打包配置

```
// 安装PWA插件
cnpm i workbox-webpack-plugin --save-dev

// webpack.prod.js
...
const WorkboxPlugin = require('workbox-webpack-plugin');
...
prodConfig = {
  ...
  plugins: [
    ...
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  ...
}

// index.js

console.log('hello, world');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
    .then(registeration => {
      console.log('service-worker registed');
    })
    .catch(error => {
      console.log('service-worker regist error')
    })
  })
}
```

## TypeScript的打包配置

1. 配置流程
* npm init初始化项目，并添加打包命令
```
{
  ...
  "scripts": {
    "build": "webpack"
  },
  ...
}
```

* 安装npm包
```
cnpm i webpack webpack-cli --save-dev
cnpm i ts-loader typescript --save-dev
```

* 在根目录创建一个webpack.config.js
```
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
}
```

* 在根目录创建src文件夹，并在src文件下创建index.js写一段ts代码
```
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");

let button = document.createElement('button');
button.textContent = "Say Hello";
button.onclick = () => {
  alert(greeter.greet());
}

document.body.appendChild(button);

```

* 同时还必须在根目录创建tsconfig.json
```
{
  "compilerOptions": {
    "outDir": "./dist",
    "module": "es6",
    "target": "es5",
    "allowJs": true,
    "allowSyntheticDefaultImports": true
  }
}
```

* 运行打包命令 npm run build即可。

6. 假设我们需要在项目中引入第三方库lodash
* 运行npm命令
```
cnpm i lodash --save

// 必须安装lodash的类型库,
cnpm i @types/lodash --save-dev
```
注意：[https://www.typescriptlang.org/dt/search]，查找相关第三方库的类型库
 

* 修改index.js
```
import * as _ from 'lodash';
// import _ from 'lodash'; tsconfig.json必须添加配置 "allowSyntheticDefaultImports": true

...
greet() {
  return _.join(["Hello, ", this.greeting], ' ');
}
...
```