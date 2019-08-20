import axios from 'axios';
import { API_URLS } from '../constants/network';
import { Storage, } from './storage';
import { Alert } from 'react-native';
;

const { serverUrl } = require('../package.json');

const authData = Storage.getAuth();


axios.interceptors.request.use(
  async config => {
    const authData = await Storage.getAuth();


    if (authData && authData.access_token) {
      config.headers.authorization = `Bearer ${authData.access_token}`;

    }
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
    // console.warn(response.status);
    Alert.alert(response.status.toString());
    return Promise.resolve(response);

  },
  error => {
    // Your Interceptor code to do something with response error
    // Return error
    return Promise.reject(error.response.data);
  }
);

export const Networker = axios.create({
});

