const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',// 开发环境：cheap-module-eval-source-map; 生产环境：cheap-module-source-map
}

module.exports = merge(commonConfig, prodConfig);