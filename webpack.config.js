const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',// 开发环境：cheap-module-eval-source-map; 生产环境：cheap-module-eval-source-map
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: ['babel-loader', 'eslint-loader'],
        // options: {
        //   presets: [ // 业务代码打包配置
        //     ['@babel/preset-env', {
        //       // corejs默认值为2
        //       // 如果设置为2：yarn add core-js@3；如果设置为2：yarn add core-js@2； core-js@3废弃了babel-polyfill，实现了完全无污染的API转译。
        //       corejs: '2',
        //       // useBuiltIns的值设置为usage时在引入es6语法时，实现按需引入。
        //       // 比如：使用了Promise语法，才引入Promise,（所谓按需就是按下面的target和编译的js用到的es6语法来判断）
        //       useBuiltIns: 'usage',
        //       targets: { // 转移es6语法时，兼容的目标浏览器
        //         chrome: '67', // 大于Chrome 67以上的版本
        //         ie: '8',  // 大于ie9及ie9以上的版本
        //       }
        //     }]
        //   ],
        //   plugins: [ // 类库的打包配置
        //     ['@babel/plugin-transform-runtime', {
        //       corejs: 2,
        //       helper: true,
        //       regenerator: true,
        //       useESModules: false,
        //     }]
        //   ]
        // }
      },
      {
        test: /\.jpg$/,
        use: {
          loader: 'url-loader', 
          options: {
            name: '[name]_[hash].[ext]', // 输出文件名称配置
            outputPath: './images', // 输出路径配置
            // publicPath: 'assets/images',
            limit: 10240
          }
        },
      }, {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: './font', // 输出路径配置
          }
        },
      }, { // webpack打包时，找到命中的文件后，使用loader编译文件时，use中的loader是倒序编译的，如scss编译时的执行顺序为：sass-loader，css-loader，style-loader
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // importLoader: 2 为了让scss文件内部引用的scss文件打包时，也从postcss-loader开始执行。
              // 如果不配置，可能直接scss文件内部引用的scss文件会直接从css-loader开始执行，从而导致scss文件内部引用的scss文件样式不会被编译成浏览器可识别的css语法
              importLoaders: 2,
              // modules: true, // css modules,防止class重名，导致css样式污染；通过模块化的方式引入css
            }
          },
          'sass-loader',
          'postcss-loader',
        ]
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ]
      },
    ],
  },
  devServer: { // 实现后端调试
    port: 8081, // 自定义本地符占用的端口
    contentBase: './dist', // 本地服务器启动项目时，访问的目录。
    overlay: true, // 将eslint报错显示到浏览器当中
    open: true, // 是否自动打开浏览器
    // hot: true, // Hot Module Replace热更新
    // hotOnly: true, // Hot Module Replace热更新失效时，webpack不做任何操作，默认时会刷新页面的
    historyApiFallback: true, // 实现单页面应用效果的配置
    // historyApiFallback: {
    //   rewrites: [{
    //     from: /abc\.html/,
    //     to: '/index.html', // to的值可以是一个函数
    //   }]
    // }, // 实现单页面应用效果的配置
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
  plugins:[
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    publicPath: '/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  }
}