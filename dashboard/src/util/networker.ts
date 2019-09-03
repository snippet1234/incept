import axios from 'axios';
import { serverUrl } from '../../package.json';
import { getAuthData } from './storage';

const authData = getAuthData();
const headers = {
  ...authData && { Authorization: `Bearer ${authData.access_token}` }
}

export const Networker = axios.create({
  baseURL: serverUrl,
  headers
});