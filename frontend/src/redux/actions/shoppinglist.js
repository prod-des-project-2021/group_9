import { SET_SHOPPINGLIST, CLEAR_SHOPPINGLIST } from './types'
import slService from "../../services/shoppinglist"

export const setShoppingList = (ingredient) => (dispatch) => {
    return slService.addToList(ingredient).then(
        (data) => {
            dispatch({
                type: SET_SHOPPINGLIST,
                payload: ingredient
            })

            return Promise.resolve()
        },

        (error) => {
            console.log(error)
        }
    )    
}

export const clearShoppingList = () => ({
    type: CLEAR_SHOPPINGLIST
})