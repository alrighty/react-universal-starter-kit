import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createClientFetch from 'app/utils/createClientFetch';
import configureStore from 'app/store';
import routes from 'app/routes';

const store = configureStore({
  history: browserHistory,
  fetch: createClientFetch(),
  initialState: window.__INITIAL_STATE__
});
const history = syncHistoryWithStore(browserHistory, store);

export default class Root extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    );
  }
}
