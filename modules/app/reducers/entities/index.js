import { combineEntitiesReducers } from 'redux-entities'

export default combineEntitiesReducers({
  users: state => state || {}
})
