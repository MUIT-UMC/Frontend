import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://13.209.69.125:8080/',
});

export {axiosInstance};



