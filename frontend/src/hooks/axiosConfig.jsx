import axios from "axios"

const BaseAxios = axios.create({
    method: 'GET',
    baseURL: 'http://192.168.0.21:3000/',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

export default BaseAxios