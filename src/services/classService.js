import { get } from '../utils/request';

export const getClasses = async (options) => {
    try {
        const response = await get('classes', options);
        return response.data;
    } catch (e) {
        return e.response.data;
    }
};
