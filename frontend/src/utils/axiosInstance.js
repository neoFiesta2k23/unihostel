import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://unihostel-backend.onrender.com/api/v1'
    // baseURL: 'http://127.0.0.1:5000/api/v1'
});

export default axiosInstance
