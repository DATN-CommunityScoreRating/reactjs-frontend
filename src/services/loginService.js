import qs from 'querystring';
import { post } from '../utils/request';

export const login = async function (userData) {
    try {
        const params = qs.stringify(userData);
        const response = await post(`login?${params}`);
        if (response?.success) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response;
    } catch (e) {
        console.log('error: ', e);
    }
};
