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
          path.resolve(__dirname, './loaders/replaceLoader.js')
        ]
      }]
    }]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
}