import request from '../utils/request';
export const getFaculties = async () => {
    try {
        const response = await request.get('faculties');
        return response.data;
    } catch (e) {
        console.log('error : ', e);
    }
};
