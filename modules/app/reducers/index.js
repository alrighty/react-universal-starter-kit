import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import entities from './entities'
import auth from './auth'

export default combineReducers({
  routing: routerReducer,
  entities,
  auth
})
