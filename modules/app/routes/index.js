import React from 'react'
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router'

import App from 'app/containers/App'

const getHomeRoute = (location, done) => {
  require.ensure(['app/containers/Home'], require => {
    const Home = require('app/containers/Home').default
    done(null, Home)
  }, 'home')
}

const getNotFoundRoute = (location, done) => {
  require.ensure(['app/containers/NotFound'], require => {
    const NotFound = require('app/containers/NotFound').default
    done(null, NotFound)
  }, 'not-found')
}

// Configure routes
export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute getComponent={getHomeRoute} />
    </Route>
    <Route path="*" getComponent={getNotFoundRoute} />
  </Route>
)
