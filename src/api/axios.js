import axios from "axios";

const baseURL = "http://127.0.0.1:8000/";
const api = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach JWT token if available
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// ✅ Handle token expiration / errors globally
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized, maybe token expired!");
    }
    return Promise.reject(error);
  }
);

export default api;
