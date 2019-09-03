

import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { getAuthData } from '../util/storage';

export const PrivateRoute = ({ component, ...rest }: { component: React.SFC }) => {
  const authToken = getAuthData();

  if (authToken) {
    return <Route {...rest} component={component} />;
  }

  return <Redirect to={{ pathname: '/login' }} />;
};
