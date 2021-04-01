const INITIAL_STATE = {
    data: []
}

export const RoomDataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOAD_ROOMS':
            return {
                ...state,
                data: action.payload
            }
        case 'ERASE_ROOM_DATA':
            return {
                ...state,
                data: []
            }    
        default:
            return state 
    }
}
