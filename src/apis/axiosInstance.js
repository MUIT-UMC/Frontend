import axios from 'axios';
const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

const axiosInstance = axios.create({
    baseURL: `${serverUrl}`,
});

export {axiosInstance};
