
const setUser = (user) =>{
    sessionStorage.setItem("user", user);
}

const getUser = async() =>{
    const user = sessionStorage.getItem("user");
    return user??null
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
    setUser
}