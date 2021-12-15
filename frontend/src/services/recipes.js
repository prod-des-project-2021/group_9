import axios from 'axios';
import user from '../utils/localUser'
require("dotenv").config();

const baseUrl = `${process.env.REACT_APP_PROXY}/api/recipes`;

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const getRecipes = (params) => {
    const request = axios.get(baseUrl, { params });
    return request.then(response => response.data);
}

const create = (newObject) => {
    const config = { headers: user.authHeader() }
    const request = axios.post(baseUrl, newObject, config);
    return request.then(response => response.data);
}
/* 
{
    headers: {
        Authorization: {},
        Content-Type: {}
    }
}
 */
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

const deleteRecipe = (id) => {
    const config = { headers: user.authHeader() }
    return axios.delete(`${baseUrl}/${id}`, config);
}

export default { getAll, getRecipes, create, update, deleteRecipe }