import { Storage } from './storage';
import { AsyncStorage } from 'react-native';
import { NavigationScreenProp, NavigationProp } from 'react-navigation';

export const isLoggedIn = async () => {
  return !!(await Storage.getAuth());
};

export const logOut = async (navigation: NavigationScreenProp<{}, {}>) => {
  await AsyncStorage.clear();
  navigation.navigate('Auth');
  return null;
};
