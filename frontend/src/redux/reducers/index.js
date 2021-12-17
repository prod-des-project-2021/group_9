import { combineReducers } from 'redux'
import auth from './auth'
import message from './message'
import shoppingList from './shoppinglist'

export default combineReducers({
    auth,
    message,
    shoppingList
})