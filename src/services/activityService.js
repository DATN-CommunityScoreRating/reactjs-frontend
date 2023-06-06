import {get, post} from '../utils/request';


export const getListActivity = async (options) => {
    try {
        const response = await get("activities", options);
        return response.data;
    } catch (e){
        return e.response.data;
    }
}

export const addActivity = async (body) => {
    try {
        return await post("activities", body);
    } catch (e) {
        return e.response;
    }
}