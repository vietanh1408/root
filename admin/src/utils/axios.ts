import queryString from "query-string";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
