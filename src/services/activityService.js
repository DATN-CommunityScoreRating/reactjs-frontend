import { get } from '../utils/request';


export const getListActivity = async (options) => {
    try {
        const response = await get("activity", options);
        return response.data;
    } catch (e){
        return e.response.data;
    }
}