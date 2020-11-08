
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
      },
      {
        test: /\.(jpg|png|gnf)$/,
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
  plugins:[
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    splitChunks: { // 代码分割配置
      chunks: 'initial', // async-只针对异步代码做代码分割； initial-只针对t同步代码做代码分割；all-无论同步或异步代码都会做代码分割打包（chunks配置需要与cacheGroups一起配合配置）
      minSize: 0, // 引入的某个库（如：lodash）大于20kb才会做代码分割
      // maxSize: 50000, // 当引入的某个库打包后大于50kb，会尝试进行二次拆分，使其小于50kb，一般设为0或者不配置
      minChunks: 1, // 当引入的某个库在项目的引入次数（即至少有一个chunk文件依赖这个库）大于等于1时，此库才会被进行代码分割
      maxAsyncRequests: 5, // 指项目打开时能同时加载的库的个数是5个js文件，故打包过程中，分割出来的库的个数已经大于5个js文件时，后面的未打包的库将不会在进行代码分割
      maxInitialRequests: 3, // 指项目首页加载的时候最多同时加载3个js文件时，后面的未打包的库将不会在进行代码分割
      automaticNameDelimiter: '~',
      name: true, // name = true时，cacheGroups分组配置中的filename才会有效
      // chunks: 'initial' | 'all' 时，cacheGroups的配置才有效
      cacheGroups: { // 代码分割输出分组配置, 当引入的库不符合任意一个分组条件时，不会做代码分割
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 引入的库是来自从node_modules文件夹才会做代码分割
          priority: -10, // 分组权重
          filename: 'vendors.js', // 输出的文件名
        },
        default: { // 当引入的库不能被打包到vendors配置的条件时时，默认放置的位置
          // minChunks: 2, // 当引入的某个库在项目的引入次数（即至少有一个chunk文件依赖这个库）大于等于2时，此库才会被进行代码分割
          priority: -20,
          reuseExistingChunk: true,
          filename: 'common.js'
        },
      }
    },
  },
  output: {
    publicPath: './',
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  }
}