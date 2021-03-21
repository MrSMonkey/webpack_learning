* 此章节的基础代码是5-12章节
## Webpack多页面打包配置
1. 新建一个list.js文件，代码如下：
```
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';

class App extends Component {
  render () {
    return (
      <div>
        <div>{_.join(['this', 'is', 'list'], ' ')}</div>
      </div>
    );
  }
}

ReactDom.render(<App/>, document.getElementById('root'));

```
2. 修改webpack.common.js
```
...
plugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    filename: 'main.html',
    chunks: ['runtime', 'vendors', 'main'],
  }),
  new HtmlWebpackPlugin({
    template: 'src/index.html',
    filename: 'list.html',
    chunks: ['runtime', 'vendors', 'list'],
  }),
  new CleanWebpackPlugin(),
];
...
module.exports = {
  entry: {
    index: './src/index.js',
    list: './src/list.js',
  },
  ...
}
...

```
3. 第2步已经完成多页面打包配置所有修改，但是有一个缺点:每次新增一个页面都需要手动添加一个new HtmlWebpackPlugin(),于是进行如下修改
```
...
const makePlugins = (configs) => {
  const plugins = [
    new CleanWebpackPlugin(),
  ];
  Object.keys(configs.entry).forEach((item) => {
    plugins.push(
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: `${item}.html`,
        chunks: ['runtime', 'vendors', item],
      })
    )
  });
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
  return plugins;
}
configs = {...};
configs.plugins = makePlugins(configs);
module.exports = configs;
```