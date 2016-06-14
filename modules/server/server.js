import path from 'path';
import exphbs from 'express-handlebars';
import express from 'express';
import cookieParser from 'cookie-parser'
import devErrorHandler from 'errorhandler'

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddlevare from 'webpack-hot-middleware';
import webpackDevConfig from '../../webpack/config.dev';

import { staticAssets, devAssets } from './utils/assets';
import { sendPage, devSendPage } from './page';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '8080';

const statsFile = path.resolve(__dirname, '../../stats.json');
const publicDir = path.resolve(__dirname, '../../public');

const app = express();

// Cookie
app.use(cookieParser())

// Templates
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'templates'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(publicDir));
  app.use(staticAssets(statsFile));
  app.use(sendPage);
} else {
  const compiler = webpack(webpackDevConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true
  }));
  app.use(webpackHotMiddlevare(compiler));
  app.use(devErrorHandler())
  app.use(express.static(publicDir));
  app.use(devAssets(compiler));
  app.use(devSendPage);
}

app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}, Ctrl+C to stop`)
})
