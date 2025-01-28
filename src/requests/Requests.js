import axios from "axios"

const request = axios.create({
    baseURL: 'http://' + process.env.ODIN_APP_API_URL
})

export {request}