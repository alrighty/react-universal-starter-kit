var path = require('path');
// Global fetch
require('isomorphic-fetch');
// Babel polyfill
require('babel-polyfill');
// Init Babel register
require('babel-register')({
  presets: ['es2015', 'stage-0', 'react'],
  plugins: [
    'transform-runtime',
    'transform-decorators-legacy',
    'transform-react-constant-elements',
    'transform-react-inline-elements',
    'remove-webpack',
    ['module-alias', [{
      expose: 'app',
      src: path.resolve(__dirname, '../../modules/app')
    }]],
    ['webpack-loaders', {
      'config': path.resolve(__dirname, '../../webpack/config.node'),
      'verbose': false
    }]]
});
// Start server
require('./server');
