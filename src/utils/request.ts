import axios from 'axios';
import { Message } from '@arco-design/web-react';
// VITE_BASE_URL = https://dsvision.net
// VITE_HTTP = https://dsvision.net/api/
// VITE_WS = wss://dsvision.net/api/
const request = axios.create({
    baseURL: "https://dsvision.net/api/",
    timeout: 5000,
})

request.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})

request.interceptors.response.use((response) => {
    if(response.data.code != 200){
        Message.error(response.data.message)
    }
    return response.data
}, (error) => {
    return Promise.reject(error)
})

export { request }