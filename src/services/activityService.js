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

export const getStudentActivity = async (activityId, params) => {
    try {
        return await get(`activities/${activityId}/students`, params);
    } catch (e){
        return e.response;
    }
}

export const getActivityById = async (activityId) => {
    try {
        return await get(`activities/${activityId}`);
    } catch (e){
        return e.response;
    }
}

export const registrationActivity = async (options) => {
    try {
        return await post('activities/registration', options);
    } catch (e){
        return e.response;
    }
}