import { get } from '../utils/request';

export const getCourses = async () => {
    try {
        const response = await get('courses');
        return response.data;
    } catch (e) {
        return e.response.data;
    }
};
