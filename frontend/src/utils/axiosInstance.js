import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/v1'
    // baseURL: 'http://192.168.239.3:5000/api/v1'
    // baseURL: 'http://192.168.137.194:5000/api/v1'
});

export default axiosInstance