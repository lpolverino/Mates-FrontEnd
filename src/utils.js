
const getUser = async() =>{

    const user = getToken() ? true : null
    return user
}

const getBackendUrl = () =>{

    return "http://localhost:3002/"
}

const setToken = (token) =>{
    sessionStorage.setItem("token", token);
}

const getToken = () => {
    return sessionStorage.getItem("token");
}

export default {
    getUser,
    getBackendUrl,
    setToken,
    getToken,
}