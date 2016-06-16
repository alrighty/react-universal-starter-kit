import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { Router, browserHistory, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import createClientFetch from 'app/utils/createClientFetch'
import configureStore from 'app/store'
import routes from 'app/routes'

import 'isomorphic-fetch'
import 'babel-polyfill'

const store = configureStore({
  history: browserHistory,
  fetch: createClientFetch(),
  initialState: window.__INITIAL_STATE__
})
const history = syncHistoryWithStore(browserHistory, store)
const mountNode = document.getElementById('root')

match({ history, routes }, (error, redirectLocation, renderProps) => {
  render(
    <Provider store={store}>
      <Router {...renderProps} />
    </Provider>,
    mountNode
  )
})
