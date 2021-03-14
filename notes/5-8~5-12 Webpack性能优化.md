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
5. 使用DllPlugin提高打包速度[5-10~5-11]
目的：第三方模块只打包一次。引入第三方模块的时候,要去使用dll文件引入。
* 第1步：新建一个webpack.dll.js,并添加如下配置
```
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

```
* 第2步：运行的打包命令[yarn run build:dll]，将第三方库打包到vendors.dll.js,并生成一个映射文件vendors.manifest.json
* 第3步: 安装[npm i add-asset-html-webpack-plugin --save]
* 第4步: 修改webpack.common.js中的plugins配置
```
...
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const Webpack = require('webpack');
const fs = require('fs');
const plugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.html',
  }),
  new CleanWebpackPlugin(),
];
const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
files.forEach((fileName) => {
  if(/.*\.dll\.js/.test(fileName)) {
    plugins.push(new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, '../dll', fileName),
    }));
  }
  if(/.*\.manifest\.json/.test(fileName)) {
    plugins.push(new Webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dll', fileName),
    }));
  }
})

module.exports = {
  ...
  plugins,
  ...
}
```

6. 控制包文件的大小
7. thread-loader,parallel-webpack,happypack多进程打包
8. 合理使用并生成sourceMap
9. 结合stats分析打包结果
10. 开发环境内存编译
11. 开发环境无用插件剔除,比如css/js压缩插件.
