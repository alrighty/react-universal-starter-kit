var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    'main': [
      './modules/app/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, '../public/assets'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.CommonsChunkPlugin('common'),
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    })
  ],
  resolve: {
    extensions: ['', '.js'],
    alias: {
      app: path.resolve(__dirname, '../modules/app')
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['es2015-webpack', 'stage-0', 'react'],
        plugins: ['transform-decorators-legacy']
      }
    },
    {
      test: /\.(scss|css)$/,
      loader: ExtractTextPlugin.extract('style', 'css')
    }]
  }
};
