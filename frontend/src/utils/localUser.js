const getUsername = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user && user.username) {
        return user.username
    } else return ''
}

const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user && user.id) {
        return user.id
    } else return ''
}

const getUserFavorites = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user && user.favorites) {
        return user.favorites
    } else return []
}

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user && user.token) {
        return {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        }
    } else {
        return {}
    }
}

export default { getUsername, getUserId, getUserFavorites, authHeader }