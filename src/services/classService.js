import { get } from '../utils/request';

export const getClasses = async () => {
    try {
        const response = await get('classes');
        return response.data;
    } catch (e) {
        return e.response.data;
    }
};
