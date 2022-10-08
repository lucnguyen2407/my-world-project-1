import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { checkToken } from "../types/checkedToken";

const SERVICE_API = "https://api.realworld.io/api/";

export const axiosInstance = axios.create({
  headers: {
    "Content-type": "application/json",
  },
  baseURL: SERVICE_API,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    const accessToken = checkToken();
    config.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
