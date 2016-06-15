import path from 'path'
import exphbs from 'express-handlebars'
import config from 'config'
import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import connectMongo from 'connect-mongo'
import devErrorHandler from 'errorhandler'

import mongoose from 'mongoose';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddlevare from 'webpack-hot-middleware'
import webpackDevConfig from '../../webpack/config.dev'

import { staticAssets, devAssets } from './utils/assets'
import { sendPage, devSendPage } from './page'

import * as routes from './routes'

const { host, port } = config.server

const statsFile = path.resolve(__dirname, '../../stats.json')
const publicDir = path.resolve(__dirname, '../../public')

// Connect to MongoDB
mongoose.connect(config.mongodb.uri)

// Get Mongo Sesion storage
const MongoStorage = connectMongo(session)

const app = express();

// Session and Cookie
app.use(cookieParser())
app.use(session({
  key: config.session.key,
  secret: config.session.secret,
  cookie: config.cookie,
  resave: true,
  saveUninitialized: false,
  store: new MongoStorage({
    mongooseConnection: mongoose.connection,
  })
}))

// API
app.use('/api', routes.api);

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
