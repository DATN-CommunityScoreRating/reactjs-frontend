import { get } from '../utils/request';

export const getUsers = async (params = {}) => {
    console.log('🚀 ~ file: userService.js:4 ~ getUsers ~ params:', params);
    try {
        const response = await get('users', params);
        return response.data;
    } catch (e) {
        return e.response.data;
    }
};
