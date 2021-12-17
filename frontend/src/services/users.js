import axios from 'axios';
import user from '../utils/localUser'
require("dotenv").config();

const baseUrl = `${process.env.REACT_APP_PROXY}/api/users`;

const getUser = (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

const updateFavorites = (id) => {
    const config = { ...user.authHeader() }
    const request = axios.post(`${baseUrl}/favorite`, id, config);
    return request.then(response => response.data);
}

const deleteUser = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

export default { getUser, create, update, updateFavorites, deleteUser }