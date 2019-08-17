import { AuthData, ClientData } from "./types";
import { STORAGE_KEYS } from '../constants/storage';

export const setStorageItem = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
}

export const getStorageItem = (key: string) => {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }

  return null;
}

export const getAuthData = (): AuthData => {
  return getStorageItem(STORAGE_KEYS.AUTH_DATA);
}

export const setAuthData = (authData: AuthData) => {
  return setStorageItem(STORAGE_KEYS.AUTH_DATA, authData);
}

export const setClientData = (clientData: ClientData) => {
  return setStorageItem(STORAGE_KEYS.CLIENT, clientData);
}

export const getClientData = (): ClientData => {
  return getStorageItem(STORAGE_KEYS.CLIENT);
}