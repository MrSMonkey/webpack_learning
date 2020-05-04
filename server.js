const express = require('express');
const webpack = require('webpack');
const webPackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
// 在弄得中使用webpack
const complier = webpack(config);

const app = express();

app.use(webPackDevMiddleware(complier, {
  publicPath: config.output.publicPath
}))


app.listen(3000, () => {
  console.log('server is rnnning');
})

