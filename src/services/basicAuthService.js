import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
export const basicAuth = async (method, uri, data, param, header) => {
    const url = API_URL + uri;
    return await axios[method](url, data, {
        params: param,
        headers: {
            Authorization: localStorage?.user?.access_token,
            ...header,
        },
    });
};
