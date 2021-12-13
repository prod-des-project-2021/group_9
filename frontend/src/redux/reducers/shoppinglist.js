import { SET_SHOPPINGLIST, CLEAR_SHOPPINGLIST } from '../actions/types'

const localUser = JSON.parse(localStorage.getItem('user'))
const initialState = localUser && localUser.shoppingList ? { user: localUser } : { isLoggedIn: false, user: null }


const shoppingList = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {

        case SET_SHOPPINGLIST:

            if (!state.user) return {}

            const newList = state.user.shoppingList.concat(payload)
            const user = { ...state.user, shoppingList: newList }
            return { 
                ...state,
                user
            }

        case CLEAR_SHOPPINGLIST:
            return { shoppingList: '' }

        default:
            return state
    }
}

export default shoppingList