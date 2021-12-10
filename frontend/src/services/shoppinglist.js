import axios from 'axios';
import user from '../utils/localUser'

require("dotenv").config();

const baseUrl = `${process.env.REACT_APP_PROXY}/api/users`;

const config = {
    headers:  user.authHeader()

}

const getShoppingLIst = (id) => {

    console.log(user.authHeader())
    const request = axios.get(`${baseUrl}/${id}/shoppinglist`, config);
    return request.then(response => response.data);
    
}

const update = (id, newObject) => {
  
    const request = axios.put(`${baseUrl}/${id}/shoppinglist`, { shoppingList: newObject }, config );
    return request.then(response => response.data); 
}



export default { getShoppingLIst, update }