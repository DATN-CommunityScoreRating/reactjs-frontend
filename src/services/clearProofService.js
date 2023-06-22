import {get, post} from "../utils/request";

export const sendActivityClearProof = async (options) => {
    try {
        return await post('clear-proofs/activities', options);
    } catch (e){
        return e.response;
    }
}

export const getActivityClearProof = async (userActivityId) => {
    try {
        return await get(`clear-proofs/activities/${userActivityId}`);
    } catch (e){
        return e.response;
    }
}

export const confirmActivityClearProof = async (clearProofId) => {
    try {
        return await post(`clear-proofs/activities/${clearProofId}`);
    } catch (e){
        return e.response;
    }
}


export const cancelClearProofActivity = async (clearProofId) => {
    try {
        return await post(`clear-proofs/activities/cancel/${clearProofId}`);
    } catch (e){
        return e.response;
    }
}

export const sendClearProof = async (options) => {
    try {
        return await post("clear-proofs", options);
    } catch (e){
        return e.response;
    }
}


export const getAllClearProof = async (options) => {
    try {
        return await get('clear-proofs', options);
    } catch (e){
        return e.response;
    }
}

export const getClearProofById = async (clearProofId) => {
    try {
        return await get(`clear-proofs/${clearProofId}`);
    } catch (e){
        return e.response;
    }
}


export const conFirmClearProof = async ({clearProofId, score}) => {
    try {
        return await post(`clear-proofs/${clearProofId}`, {score});
    } catch (e){
        return e.response;
    }
}

export const cancelClearProof = async (clearProofId) => {
    try {
        return await post(`clear-proofs/cancel/${clearProofId}`);
    } catch (e){
        return e.response;
    }
}

