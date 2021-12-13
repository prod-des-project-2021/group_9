import axios from 'axios';
import user from '../utils/localUser'

require("dotenv").config();

const baseUrl = `${process.env.REACT_APP_PROXY}/api/users`;



const getShoppingList = () => {
    const [id, config] = getUser()
    const request = axios.get(`${baseUrl}/${id}/shoppinglist`, config);
    return request.then(response => response.data);
    
}

const update = (newObject) => {
    const [id, config] = getUser()
    const request = axios.put(`${baseUrl}/${id}/shoppinglist`, { shoppingList: newObject }, config );
    return request.then(response => response.data); 
}

const addToList = (ingredient) => {
    const [id, config] = getUser()
    const request = axios.put(`${baseUrl}/${id}/shoppinglist/add`, { ingredient }, config);
    return request.then(response => response.data);
}

const getUser = () => {
    return [user.getUserId(), user.authHeader()] 
}

const slService = { getShoppingList, update, addToList }

export default slService