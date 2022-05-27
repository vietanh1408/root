import queryString from "query-string";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ACCESS_TOKEN } from "src/constants/local-storage";
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      typeof window !== "undefined" &&
      `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: AxiosRequestConfig) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

export default axiosClient;
