var path = require('path');

module.exports = {
  output: {
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      app: path.resolve(__dirname, '../modules/app')
    }
  },
  module: {
    loaders: [{
      test: /\.(scss|css)$/,
      loader: 'css-loader/locals'
    }]
  }
};
