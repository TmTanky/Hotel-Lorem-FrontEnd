export const loginUser = (data) => {
    return {
        type: 'LOGIN_USER',
        payload: data
    }
}

export const logoutUser = () => {
    return {
        type: 'LOGOUT_USER'
    }
}

export const loginSuccess = () => {
    return {
        type: 'LOGIN_SUCCESS'
    }
}

export const logoutSuccess = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

export const loadRooms = (data) => {
    return {
        type: 'LOAD_ROOMS',
        payload: data
    }
}

export const loadTheUser = (data) => {
    return {
        type: 'LOAD_USER_INFO',
        payload: data
    }
}

export const unloadTheUser = () => {
    return {
        type: 'UNLOAD_THE_USER'
    }
}

export const eraseRoomData = () => {
    return {
        type: 'ERASE_ROOM_DATA'
    }
}