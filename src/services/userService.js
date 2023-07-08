import { get } from '../utils/request';

export const getUsers = async (params = {}) => {
    try {
        const response = await get('users', params);
        return response.data;
    } catch (e) {
        return e.response.data;
    }
};

export const getMyAccount = async (params = {}) => {
    try {
        const response = await get('users/my-account', params);
        return response.data;
    } catch (e) {
        return e.response.data;
    }
};
