import axios from "axios";
import Cookies from "js-cookie";

import { API_URL } from "@/utils/constants";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Enable sending cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add JWT token from cookies
api.interceptors.request.use(
  (config: any) => {
    const token = Cookies.get("jwt");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: any) => Promise.reject(error),
);

// Response interceptor to handle authentication errors
api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      // Remove invalid token
      Cookies.remove("jwt");
      // Redirect to sign-in page
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  },
);

export default api;
