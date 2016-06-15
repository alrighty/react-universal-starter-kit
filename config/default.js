module.exports = {
  server: {
    host: '0.0.0.0',
    port: 8080
  },
  mongodb: {
    uri: 'mongodb://localhost/react-universal-starter-kit'
  },
  session: {
    key: 'sid',
    secret: 'keyboard cat'
  },
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000
  },
  github: {
    clientID: 'get_your_own',
    clientSecret: 'get_your_own',
    callbackURL: 'http://localhost:8080/api/auth/github/callback'
  }
};
