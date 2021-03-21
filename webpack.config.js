const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [{
      rules: [{
        test: /\.js/,
        use: [
          {
            loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
          },
          {
            loader: path.resolve(__dirname, './loaders/replaceLoaderAsync.js'),
            options: {
              name: 'lee',
            }
          }
        ]
      }]
    }]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}