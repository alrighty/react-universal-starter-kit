module.exports = {
  server: {
    host: 'SERVER_HOST',
    port: 'SERVER_PORT'
  },
  mongodb: {
    uri: 'MONGODB_URI'
  },
  session: {
    key: 'SESSION_KEY',
    secret: 'SESSION_SECRET'
  },
  cookie: {
    maxAge: 'COOKIE_MAXAGE'
  },
  github: {
    clientID: 'GITHUB_CLIENT_ID',
    clientSecret: 'GITHUB_CLIENT_SECRET',
    callbackURL: 'GITHUB_CALLBACK_URL'
  }
};
