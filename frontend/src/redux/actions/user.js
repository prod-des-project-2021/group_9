import { UPDATE_FAVORITES } from './types'
import userService from "../../services/users"

export const updateFavorites = (id) => (dispatch) => {
    return userService.updateFavorites({ recipeId: id }).then(
        (data) => {
            dispatch({
                type: UPDATE_FAVORITES,
                payload: id
            })

            return Promise.resolve()
        },

        (error) => {
            console.log(error)
        }
    )
}