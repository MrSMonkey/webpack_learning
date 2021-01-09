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
