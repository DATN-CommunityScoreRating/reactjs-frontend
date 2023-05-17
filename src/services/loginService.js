import axios from "axios";
export const login = async function (userData) {
    const response = await axios.post('http://localhost:8080/login', null, {
        params: {username: userData.username, password: userData.password}
    })

    if (response?.data?.access_token) {
        localStorage.setItem('user', JSON.stringify(response.data));

    }
    return response.data;
}