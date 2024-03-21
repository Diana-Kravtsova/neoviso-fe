import axios from 'axios';
import { getStorage } from '../services/StorageService';
import { logOut } from '../services/UserService';

const baseUrl = `${window.location.protocol}//${window.location.hostname}:8000/`;

const AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
    }
});

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = getStorage().getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            config.headers.Authorization = ``;
        }
        return config;
    }
);

AxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            logOut()
        }
    }
);

export default AxiosInstance;
