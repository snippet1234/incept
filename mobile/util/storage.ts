import { AsyncStorage } from 'react-native';

import { ClientData, AuthUser } from '../types/auth';
import { STORAGE_KEYS } from '../constants/storage';

async function setData(key: string, data: any) {
  return await AsyncStorage.setItem(key, JSON.stringify(data));
}

async function getData(key: string, def: any) {
  return await AsyncStorage.getItem(key, def);
}

async function setClient(client: ClientData) {
  return await setData(STORAGE_KEYS.CLIENT, client);
}

async function getClient() {
  return await getData(STORAGE_KEYS.CLIENT, null);
}

async function setUser(user: AuthUser) {
  return await setData(STORAGE_KEYS.CLIENT, user);
}
async function getUser() {
  return await getData(STORAGE_KEYS.CLIENT, null);
}

export const Storage = {
  getData,
  setData,
  setClient,
  getClient,
  setUser,
  getUser
};
