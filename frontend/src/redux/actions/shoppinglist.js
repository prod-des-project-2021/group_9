import { SET_SHOPPINGLIST, CLEAR_SHOPPINGLIST } from './types'

export const setShoppingList = (ingredient, dispatch) => {
    dispatch ({
        type: SET_SHOPPINGLIST,
        payload: ingredient
    })
}

export const clearShoppingList = () => ({
    type: CLEAR_SHOPPINGLIST
})