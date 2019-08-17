import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import { AuthNavigator } from './AuthNavigator';
import { MainDrawerNavigator } from './MainDrawerNavigator';
import  ResetPasswordNavigator  from './ResetPasswordNavigator';


export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      Main: MainDrawerNavigator,
      Auth: AuthNavigator,
      Reset: ResetPasswordNavigator,
     
    },
    { initialRouteName: 'Auth' }
  )
);
