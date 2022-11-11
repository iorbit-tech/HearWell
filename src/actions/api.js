import axios from 'axios';

var api = axios.create({
    baseURL: 'http://localhost:8000/',
    responseType: 'json',
    responseEncoding: 'utf8',

});

export default api;