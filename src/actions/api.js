import axios from 'axios';

var api = axios.create({
    // baseURL: 'http://localhost:8000/',
    baseURL: 'http://178.128.165.237:8000/',
    responseType: 'json',
    responseEncoding: 'utf8',

});

export default api;