'use client'

import axios from "axios";

const MONGODB_URI = process.env.MONGODB_URIL as string;
export const USER_TOKEN = process.env.NEXT_PUBLIC_USER_TOKEN as string;

export const AxiosInstance = axios.create({
  baseURL: MONGODB_URI,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(USER_TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data.auth === "invalid") {
      localStorage.removeItem(USER_TOKEN);
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  }
);