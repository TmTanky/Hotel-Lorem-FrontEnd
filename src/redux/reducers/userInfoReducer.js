const INITIAL_STATE = {
    user: {}
}

export const userInfoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOAD_USER_INFO':
            return {
                ...state,
                user: action.payload
            }
        case 'UNLOAD_THE_USER':
            return {
                ...state,
                user: {}
            }    
        default:
            return state   
    }
}

