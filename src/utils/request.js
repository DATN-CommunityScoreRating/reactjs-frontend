import axios from 'axios';

export const getLocalToken = () => {
    const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
    return token;
};

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 300000,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use((config) => {
    const token = getLocalToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error) {
            const status = error.response.status;
            if (status === 401 || status === 403) {
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }
    }
);

export const get = async (path, options = {}) => {
    const response = await instance.get(path, { params: options });
    return response.data;
};

export const post = async (path, options = {}) => {
    const response = await instance.post(path, options);
    return response.data;
};

export default instance;
