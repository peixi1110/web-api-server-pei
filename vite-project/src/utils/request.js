// axios 
import axios from "axios"
import { getToken, removeToken } from "./token";
import router from "@/router";


// 1. root url
// 2. expire time
const request = axios.create ({ 
    baseURL: 'http://127.0.0.1:3007', 
    timeout: 5000
})

// 3. request/response Interceptor
// Add a request interceptor
request.interceptors.request.use((config) => {
    // 1. get token
    const token = getToken()
    // 2. backend format 
    if (token) {
      config.headers.Authorization = token
    }
    return config;
  }, (error) => {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
request.interceptors.response.use((response) => {
  // if token expired, turn to login page
  if (response.data.status === 1) {
    removeToken()
    router.navigate('/login')
    window.location.reload()
  }
    return response;
  }, (error) => {
    return Promise.reject(error);
  });

export { request }