import { get } from "lodash";
import api from "./api";

export const submitSignup = (data) => {
    let newData = {
        ...data,
    };
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

export const fetchVitals = (userId) => {
    return dispatch => {
        dispatch({
            type: "FETCH_VITALS",
            payload: api.get('api/vitals/userid/' + userId)
        })
    }
}

export const updateVitals = (data, userId, vitalId) => {
    var healthCondition = { 'diabets': get(data, 'diabets'), 'hyperTension': get(data, 'hyperTension') };
    var append = { ...data, userId, healthCondition };
    console.log(vitalId, 'append');
    return dispatch => {
        dispatch({
            type: "UPDATE_VITALS",
            payload: api.put('/api/vitals/' + vitalId, append),
            meta: {
                data: append
            }
        })
    }
}


export const setToken = (data, user) => {
    console.log(data, 'setToken')
    return (dispatch) => {
        dispatch({
            type: "SET_TOKEN",
            payload: {
                data: data, user: user
            },
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

export const submitAnswer = (data) => {
    return dispatch => {
        dispatch({
            type: "SUBMIT_ANSWER",
            payload: api.post('/api/answers', data)
        })
    }
}

export const submitTellusAnswer = (data) => {
    return dispatch => {
        dispatch({
            type: "TELLUS_ANSWER",
            payload: api.post('/api/answers', data)
        })
    }
}

export const submitGoogleAuth = (data) => {
    console.log("data submitGoogleAuth", data);
    return dispatch => {
        dispatch({
            type: "GOOGLE_AUTH",
            payload: api.post('/api/user/isuser', data)
        })
    }
}

export const checkRegistered = (data) => {
    return (dispatch) => {
        dispatch({
            type: "CHECK_REGISTERED",
            payload: data,
        });
    };
};

export const clearState = () => {
    return (dispatch) => {
        dispatch({
            type: "LOGOUT",
        });
    };
}

export const googleauthcheck = (data) => {
    console.log("authCheck", data);
    return dispatch => {
        dispatch({
            type: "GOOGLE_AUTH_CHECK",
            payload: api.post('/api/user/googlelogin', data)
        })
    }
}

export const clearResponse = () => {
    return dispatch => {
        dispatch({
            type: "CLEAR_RESPONSE",
        })
    }
}