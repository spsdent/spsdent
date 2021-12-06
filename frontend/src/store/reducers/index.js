import { combineReducers } from 'redux'
import auth from './auth'
import message from './message'
import refresh from './refresh'

export default combineReducers({
  auth,
  message,
  refresh,
})
