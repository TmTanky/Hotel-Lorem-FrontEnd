import { combineReducers } from 'redux'

import { userReducer } from './userReducer'
import { isLoggedInReducer } from './isLoggedIn'
import { RoomDataReducer } from './roomDataReducer'

export const rootReducer = combineReducers({
    user: userReducer,
    isLoggedIn: isLoggedInReducer,
    allRooms: RoomDataReducer
})