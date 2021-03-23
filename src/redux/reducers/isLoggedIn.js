export const isLoggedInReducer = (state = false, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return state = true
        case 'LOGOUT_SUCCESS':
            return state = false
        default:
            return state        
    }
}