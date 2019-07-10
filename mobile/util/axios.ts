import axios from 'axios';

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    //
    //   Your Interceptor code to do something with the response data
    // Return response data
    return response;
  },
  error => {
    // Your Interceptor code to do something with response error
    // Return error
    return Promise.reject(error);
  }
);

export const Networker = axios;
