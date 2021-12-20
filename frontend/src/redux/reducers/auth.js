import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    UPDATE_FAVORITES,
} from '../actions/types'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null }

const auth = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false
            }

        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user
            }

        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }

        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }

        case UPDATE_FAVORITES:
            let favorites = state.user.favorites;
            const newFavorite = payload;

            console.log(`current: ${favorites}`);

            if (favorites.includes(newFavorite)) {
                favorites = favorites.filter(id => id !== newFavorite);
                console.log(`after remove: ${favorites}`);
            }
            else {
                favorites = favorites.concat(newFavorite);
                console.log(`after add: ${favorites}`);
            }

            const user = { ...state.user, favorites };

            //Object.assign(state.auth.user, user);

            console.log(user);

            return {
                ...state,
                user
            }

        default:
            return state
    }
}

export default auth