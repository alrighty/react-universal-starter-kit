import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import apiMiddleware from 'app/middleware/api';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk'
import rootReducer from 'app/reducers';

export default function configureStore({ history, fetch, initialState }) {

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        apiMiddleware({ fetch }),
        routerMiddleware(history),
        loggerMiddleware({ collapsed: true })
      )
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('app/reducers', () => {
      const nextRootReducer = require('app/reducers').default;
      store.replaceReducer(nextRootReducer);
    })
  }

  return store;
}
