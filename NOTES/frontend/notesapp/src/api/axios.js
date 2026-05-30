import axios from "axios";

const api = axios.create({
  baseURL: "/notes",
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;