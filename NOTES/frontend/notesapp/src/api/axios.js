import axios from "axios";

const api = axios.create({
    baseURL : "https://turbo-succotash-pj6vq9wpj9gjc9r65-8000.app.github.dev/notes"
})

export default api;