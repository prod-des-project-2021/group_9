import { SET_SHOPPINGLIST, CLEAR_SHOPPINGLIST } from '../actions/types'

const localUser = JSON.parse(localStorage.getItem('user'))
const initialState = localUser && localUser.shoppingList ? { shoppingList: localUser.shoppingList } : { isLoggedIn: false, localUser: null }


const shoppingList = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_SHOPPINGLIST:

            const newList = state.localUser.shoppingList.concat(payload)
            const user = { ...state.localUser, shoppingList: newList }
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