import axios from "axios";

const api = axios.create({
    baseURL : "/notes"
})

export default api;