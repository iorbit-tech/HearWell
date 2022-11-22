import api from "./api";

export const submitSignup = (data) => {
    const gender = data.gender;
    const maritalStatus = data.maritalStatus;
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
    console.log(newData, 'newData')
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
    const append = { ...data, userId }
    console.log(append, 'append');
    return dispatch => {
        dispatch({
            type: "CREATE_VITALS",
            payload: api.post('api/vitals', append)
        })
    }
}