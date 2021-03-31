import { combineReducers } from 'redux'

import { userReducer } from './userReducer'
import { isLoggedInReducer } from './isLoggedIn'
import { RoomDataReducer } from './roomDataReducer'
import { userInfoReducer } from './userInfoReducer'

export const rootReducer = combineReducers({
    user: userReducer,
    userInfo: userInfoReducer,
    isLoggedIn: isLoggedInReducer,
    allRooms: RoomDataReducer
})