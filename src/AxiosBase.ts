import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:'https://api.covid19india.org/'
});

export default axiosInstance;