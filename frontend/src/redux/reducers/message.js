import { SET_MESSAGE, SET_WARNING, CLEAR_MESSAGE } from '../actions/types'
import { toast } from 'react-toastify'

const initialState = {}

const message = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_MESSAGE:
            toast.success(payload)
            return { message: payload }

        case SET_WARNING:
            toast.warning(payload)
            return { message: payload }

        case CLEAR_MESSAGE:
            return { message: '' }

        default:
            return state
    }
}

export default message