* 此章节的基础代码是5-4章节
```
// webpack.config.js
...
module.exports = {
  ...
  devServer: { // 实现后端调试
    ...
    historyApiFallback: true, // 实现单页面应用效果的配置
    // historyApiFallback: {
    //   rewrites: [{
    //     from: /abc\.html/,
    //     to: '/index.html', // to的值可以是一个函数
    //   }]
    // }, // 实现单页面应用效果的配置
    ...
  },
  ...
}
...
```