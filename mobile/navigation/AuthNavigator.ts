import { createStackNavigator } from 'react-navigation';

import { RegisterScreen } from '../screens/RegisterScreen';
import { LoginScreen } from '../screens/auth/login/LoginScreen';

export const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Register: {
      screen: RegisterScreen
    }
  },
  { initialRouteName: 'Login', headerMode: 'none' }
);
