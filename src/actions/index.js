import { get } from "lodash";
import api from "./api";

export const submitSignup = (data) => {
    const gender = get(data, 'gender');
    const maritalStatus = get(data, 'maritalStatus');
    let newData = {
        ...data,

    };
    if (gender == 0) {
        newData.gender = 'male'
    }
    else if (gender == 1) {
        newData.gender = 'female'
    }
    else {
        newData.gender = 'other'
    }
    if (maritalStatus == 0) {
        newData.maritalStatus = 'single'
    }
    else {
        newData.maritalStatus = 'married'
    }
    newData.userType = 'user';
    newData.status = 'true';
    return dispatch => {
        dispatch({
            type: "SIGNUP",
            payload: api.post('api/user/', newData)
        })
    }
}

export const submitLogin = (data) => {
    console.log(data, 'data')
    return dispatch => {
        dispatch({
            type: "LOGIN",
            payload: api.post('api/user/login', data)
        })
    }
}

export const submitVitals = (data, userId) => {
    console.log(data, 'data');
    var healthCondition = { 'diabets': get(data, 'diabets'), 'hyperTension': get(data, 'hyperTension') };
    var append = { ...data, userId, healthCondition };
    console.log(append, 'append');
    return dispatch => {
        dispatch({
            type: "CREATE_VITALS",
            payload: api.post('api/vitals', append)
        })
    }
}

export const setToken = (data) => {
    return (dispatch) => {
        dispatch({
            type: "SET_TOKEN",
            payload: data,
        });
    };
};

export const getTellusQuestions = () => {
    return dispatch => {
        dispatch({
            type: "TELLUS_LIST",
            payload: api.get('api/questions/page/tellus')
        })
    }
}

export const getHearingQuestions = () => {
    return dispatch => {
        dispatch({
            type: "HEARING_LIST",
            payload: api.get('api/questions/page/hearingdiary')
        })
    }
}

export const submitChat = (data, userID) => {
    var message = { 'subject': 'Message', 'message': data[0].text, 'sentTime': new Date(), 'senderId': userID, 'receiverId': '' };
    console.log(message, 'submitChat');
    return dispatch => {
        dispatch({
            type: "CREATE_CHAT",
            payload: api.post('/api/chat', message),
        })
    }
}

export const getChat = (userID) => {
    return dispatch => {
        dispatch({
            type: "GET_CHAT",
            payload: api.get('/api/chat/' + userID)
        })
    }
}