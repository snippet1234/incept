import axios from 'axios';
import { getAuthData } from './storage';

const { serverUrl } = require('../../package.json');

const authData = getAuthData();

export const Networker = axios.create({
  baseURL: serverUrl,
  headers: {
    authorization: `Bearer ${authData.access_token}`
  }
});