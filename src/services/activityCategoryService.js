import {get} from "../utils/request";

export const getActivityCategory = async () => {
    try {
        return await get("activity-categories");
    } catch (e){
        return e.response;
    }
}

export const getSubActivityCategory = async (options) => {
    try {
        return await get("activity-subcategories", options);
    } catch (e){
        return e.response;
    }
}