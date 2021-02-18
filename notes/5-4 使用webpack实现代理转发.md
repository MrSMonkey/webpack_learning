* 此章节的基础代码是复制3-13章节
```
// 安装 axios
npm i axios --save-dev


// index.js
...
import  axios from 'axios';

class App extends Component {
  componentDidMount() {
    // Charles Fiddler
    axios.get('/react/api/header.json').then((data) => {
      console.log(data);
    })
  }
  ....
}
...


// webpack.config.js
...
module.exports = {
  ...
  devServer: { // 实现后端调试
    port: 8081, // 自定义本地符占用的端口
    contentBase: './dist', // 本地服务器启动项目时，访问的目录。
    open: true, // 是否自动打开浏览器
    // hot: true, // Hot Module Replace热更新
    // hotOnly: true, // Hot Module Replace热更新失效时，webpack不做任何操作，默认时会刷新页面的
    proxy: {
      'api/': 'http://localhost:3000', // 异步数据请求代理转发地址
      '/react/api/': {
        target: 'http://www.dell-lee.com', // 异步数据请求代理转发地址
        // secure: false, // 实现https请求的转发
        pathRewrite: {
          'header.json': 'demo.json' // 这里指的是'/react/api/header.json'会被重写'/react/api/demo.json'
        }
      },
      chagngeOrigin: true, //（爬虫）抓取 第三方网站 数据
      // header: {
      //   cookie: 'fadfa'
      // }
    }
  },
  ...
}
...
```