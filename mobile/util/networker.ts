import axios from 'axios';
import { API_URLS } from '../constants/network';
import { Storage } from './storage';

axios.interceptors.request.use(
  async config => {
    const authData = await Storage.getAuth();

    console.warn(config.method, config.url);
    if (authData && authData.access_token) {
      config.headers.authorization = `Bearer ${authData.access_token}`;

    }
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

export const Networker = axios;
