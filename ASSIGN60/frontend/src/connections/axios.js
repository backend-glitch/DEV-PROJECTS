import axios from "axios";

const API = axios.create({
    baseURL : "http://localhost:5000/assign/"
})

export default API;