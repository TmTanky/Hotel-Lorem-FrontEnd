const INITIAL_STATE = {
    bookings: []
}

export const BookingsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_BOOKING':
            return {
                ...state,
                bookings: action.payload
            }
        default:
            return state 
    }
}