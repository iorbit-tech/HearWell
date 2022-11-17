import api from "./api";

export const submitSignup = (data) => {
    return dispatch => {
        dispatch({
            type: "SIGNUP",
            payload: api.post('api/user/', data)
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