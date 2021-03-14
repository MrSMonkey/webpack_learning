* 此章节的基础代码是4-10章节
## Webpack性能优化
1. 跟上技术的迭代(Node, Npm, Yarn),升级到最新版本；[5-8]
2. 在尽可能少的模块上应用Loader,比如打包时不需要使用babel-loader对node_modules的js文件再次进行编译；[5-8]
3. Plugin尽可能精简并确保可靠，即尽可能少使用Plugin。比如在开发环境下不需要对css进行压缩，则不需要配置OptimizeCssAssetsWebpackPlugin；[5-8]
4. resolve参数合理配置；[5-9]
```
// webpack.common.js
...
module.exports = {
  ...
  resolve: {
    extensions: ['.js', '.jsx'], // 引入文件时省略文件后缀时，会优先匹配这两种格式，考虑性能（一般不配置图片后缀等）
    alias: {
      delllee: path.resolve(__dirname, '../src/child'), // 文件别名引入
    },
    mainFiles: ['index', 'child'], // 默认优先引入文件夹下文件名（不包括后缀）为index，其次是child
  },
  ...
}
...

// 在index.js引入文件'./src/child/child.jsx',以下三种方式均有效

import Child from './child/child'; // 方式1
import Child from './child'; // 方式2
import Child from 'delllee'; // 方式3
```
5. 使用DllPlugin提高打包速度
