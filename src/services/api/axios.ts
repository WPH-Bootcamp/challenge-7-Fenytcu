import axios from 'axios';
import Cookies from 'js-cookie';

console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

// Fallback to the known backend URL if env var is missing
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://restaurant-be-400174736012.asia-southeast2.run.app";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
