const path = require('path')

module.exports = {
  output: {
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      app: path.resolve(__dirname, '../modules/app'),
      server: path.resolve(__dirname, '../modules/server')
    }
  },
  module: {
    loaders: [{
      test: /\.(scss|css)$/,
      loader: 'css-loader/locals'
    }]
  }
}
