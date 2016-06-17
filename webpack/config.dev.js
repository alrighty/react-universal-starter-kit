var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'eval',
  entry: {
    'main': [
      'webpack-hot-middleware/client',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.optimize.CommonsChunkPlugin('common')
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
        presets: ['es2015-webpack', 'stage-0', 'react', 'react-hmre'],
        plugins: ['transform-decorators-legacy']
      }
    },
    {
      test: /\.(scss|css)$/,
      loaders: ['style', 'css', 'postcss']
    }]
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] })
  ]
};
