import {deleteAxios, get, post} from '../utils/request';


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
    } catch (e) {
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
        return await post('activities/kafka/registration', options);
    } catch (e){
        return e.response;
    }
}

export const deleteUserActivity = async (userActivityId) => {
    try {
        return await deleteAxios(`activities/students/${userActivityId}`)
    } catch (e){
        return e.response;
    }
}

export const deleteActivity = async (activityId) => {
    try {
        return await deleteAxios(`activities/${activityId}`)
    } catch (e){
        return e.response;
    }
}

export const getMyActivities = async () => {
    try {
        return await get('activities/my-activity')
    } catch (e){
        return e.response;
    }
}


export const cancelActivity = async (activityId) => {
    try {
        return await deleteAxios(`activities/kafka/cancel/${activityId}`)
    } catch (e){
        return e.response;
    }
}