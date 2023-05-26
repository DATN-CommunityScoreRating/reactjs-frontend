import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL
export const basicAuth = async (method, uri, data, param, header) => {
    return await axios[method](API_URL + uri, data, {
        params: param,
        headers: {
            Authorization: localStorage?.user?.access_token,
            ...header
        }
    });
}
