import config from "@/config";
import { getAccessToken } from "@/utils/local-storage";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${config.servers.apiUrl}`,
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
