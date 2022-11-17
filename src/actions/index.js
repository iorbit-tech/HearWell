import api from "./api";

export const submitSignup = async (data) => {
    console.log(data, 'data');
    await api.post('api/user/', data)
        .then(response => {
            console.log(response, 'signupData1');
            // if Login/Signup successful, we need to setThe Token for further API calls
            // api.defaults.headers.common["Authorization"] = `Bearer ${signupData.token}`;
            // We need to return the signupData
        })
        .catch(error => console.log(error));
}

export const submitLogin = (data) => {
    api.post('api/user/login', data)
        .then(response => {
            console.log(response, 'signupData');
            // if Login/Signup successful, we need to setThe Token for further API calls
            // api.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
            // We need to return the signupData
        })
        .catch(error => console.log(error));
}
