import axios from 'axios';
const baseUrl = '/api/users';

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