import { combineReducers } from 'redux'

import { userReducer } from './userReducer'
import { isLoggedInReducer } from './isLoggedIn'
import { BookingsReducer } from './bookings'

export const rootReducer = combineReducers({
    user: userReducer,
    isLoggedIn: isLoggedInReducer,
    bookings: BookingsReducer
})