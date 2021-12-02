import axios from 'axios';
require("dotenv").config();

// url not final...
const baseUrl = `${process.env.REACT_APP_PROXY}/api/auth/`;

const register = (username, email, password) => {
    return axios.post(baseUrl + 'signup', {
        username,
        email,
        password,
    })
}

const login = (username, password) => {
    return axios.post(baseUrl + 'login', {
        username,
        password,
    })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data))
            }
            return response.data
        })
}

const logout = () => {
    localStorage.removeItem('user')
}

const exportedObject = {
    register,
    login,
    logout
}
export default exportedObject