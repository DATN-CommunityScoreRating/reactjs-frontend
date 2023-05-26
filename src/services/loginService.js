import {basicAuth} from "./basicAuthService";
export const login = async function (userData) {
    try {
        const response = await basicAuth("post", "/login", null, userData, {})
        if (await response?.data?.success) {
            localStorage.setItem('user', JSON.stringify(response.data));

        }
        return response.data;
    } catch (e) {
        return e.response.data
    }
}