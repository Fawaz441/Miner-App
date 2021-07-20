import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:'https://miner120.herokuapp.com'  
})

export default axiosInstance