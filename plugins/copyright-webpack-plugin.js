class CopyrightWebpackPlugin {
  // compiler打包中所有的信息，配置信息等
  apply(compiler) {
    debugger;
    compiler.hooks // hooks[钩子]：值得是webpack打包过程中的不同阶段时暴露出来的钩子，我们可以利用这些钩子做一些处理
      .compile
      // 同步钩子的同步调用方式api
      .tap('CopyrightWebpackPlugin', (compilation) => { // compilation 只是这次打包的信息
        console.log('compile-step');
      });
    compiler.hooks
      .emit // emit: 将打包后的文件放入webpack.config.js中指定的output文件夹的时刻，这是一个异步的钩子
      // tapAsync异步钩子的同步调用方式api
      .tapAsync('CopyrightWebpackPlugin', (compilation, callback) => {
        const str = 'copyright by dell lee';
        compilation.assets['copyright.txt'] = {
          source: function() {
            return str; // 写入的文件内容
          },
          size: function () {
            return str.length; // 设定文件大小
          }
        }
        callback();
      });
  }
}

module.exports = CopyrightWebpackPlugin;
