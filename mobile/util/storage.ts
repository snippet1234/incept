import { AsyncStorage } from 'react-native';

import { ClientData, AuthUser, AuthData } from '../types/auth';
import { STORAGE_KEYS } from '../constants/storage';

async function setData(key: string, data: any) {
  return await AsyncStorage.setItem(key, JSON.stringify(data));
}

async function getData(key: string, def: any) {
  const data = await AsyncStorage.getItem(key, def);
  try {
    return JSON.parse(data);
  } catch (err) {
    return def;
  }
}

async function setClient(client: ClientData) {
  return await setData(STORAGE_KEYS.CLIENT, client);
}

async function getClient(): Promise<ClientData | null> {
  return await getData(STORAGE_KEYS.CLIENT, null);
}

async function setUser(user: AuthUser) {
  return await setData(STORAGE_KEYS.CLIENT, user);
}
async function setAuth(user: AuthData) {
  return await setData(STORAGE_KEYS.AUTH, user);
}

async function getUser() {
  return await getData(STORAGE_KEYS.CLIENT, null);
}
async function getAuth() {
  return await getData(STORAGE_KEYS.AUTH, null);
}

export const Storage = {
  getData,
  setData,
  setClient,
  getClient,
  setUser,
  getUser,
  setAuth,
  getAuth
};
