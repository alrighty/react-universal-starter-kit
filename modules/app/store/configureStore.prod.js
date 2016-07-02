import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import apiMiddleware from 'app/middleware/api'
import thunkMiddleware from 'redux-thunk'
import rootReducer from 'app/reducers'

export default function configureStore({ history, fetch, initialState }) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        apiMiddleware({ fetch }),
        routerMiddleware(history),
      )
    )
  )

  return store
}
