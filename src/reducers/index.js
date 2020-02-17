import {combineReducers} from 'redux'

import notifications from './notification'
import user from './user'
export default combineReducers({
    notifications,
    user,
})