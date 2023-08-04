// frontend/src/api.js

import axios from "axios";

const API = axios.create({
  baseURL: "https://colab-bn2s.onrender.com", // Production backend API base URL
  // baseURL: "http://localhost:5000/api", // Development backend API base URL
  timeout: 5000, // Timeout in milliseconds
  withCredentials: true, // To send cookies along with requests
});

// Interceptor to add access token to requests
API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// Interceptor to refresh access token if needed
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 403 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;
      try {
        const response = await API.post("/auth/refresh", {
          refreshToken: localStorage.getItem("refreshToken"),
        });
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token failure (e.g., logout user)
        console.error("Failed to refresh access token");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
