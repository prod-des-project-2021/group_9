import { SET_MESSAGE, SET_WARNING, CLEAR_MESSAGE } from './types'

export const setMessage = (message, isSuccess = false) => {
    if (isSuccess) {
        return {
            type: SET_MESSAGE,
            payload: message
        }
    } else {
        return {
            type: SET_WARNING,
            payload: message
        }
    }
}

export const clearMessage = () => ({
    type: CLEAR_MESSAGE
})