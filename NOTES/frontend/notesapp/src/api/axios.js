import axios from "axios";

const api = axios.create({
  baseURL:  "https://dev-projects-73iz.onrender.com",
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();

      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;