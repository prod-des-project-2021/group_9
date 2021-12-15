import axios from 'axios';
require("dotenv").config();

const baseUrl = `${process.env.REACT_APP_PROXY}/api/recipes`;

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

const deleteUser = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

export default { getUser, create, update, deleteUser }