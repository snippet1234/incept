import axios from 'axios';
import { API_URLS } from '../constants/network';

axios.interceptors.request.use(
  config => {
    console.warn(config.baseURL, config.method, config.url);
    return config;
  },
  error => {
    console.warn(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    //
    //   Your Interceptor code to do something with the response data
    // Return response data
    console.warn(response.status);
    return response;
  },
  error => {
    // Your Interceptor code to do something with response error
    // Return error
    console.warn(error);
    return Promise.reject(error);
  }
);

export const Networker = axios.create({
  baseURL: API_URLS.BASE,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
