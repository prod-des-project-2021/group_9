import { UPDATE_FAVORITES } from '../actions/types'

const localUser = JSON.parse(localStorage.getItem('user'))
const initialState = localUser && localUser.favorites ? { user: localUser } : { isLoggedIn: false, user: null }


const favorites = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {

        case UPDATE_FAVORITES:

            if (!state.user) return {}

            const newFavorites = state.user.favorites.concat(payload)
            const user = { ...state.user, favorites: newFavorites }
            return {
                ...state,
                user
            }

        default:
            return state
    }
}

export default favorites