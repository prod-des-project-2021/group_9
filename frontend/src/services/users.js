import axios from 'axios';
require("dotenv").config();

const baseUrl = `${process.env.REACT_APP_PROXY}/api/recipes`;

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const get = (params) => {
    const request = axios.get(baseUrl, {params});
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

export default { getAll, create, update, deleteUser }