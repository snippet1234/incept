import React from 'react';
import { Switch, Route } from 'react-router';

import { Dashboard } from '../common/Dashboard';
import { Forms } from '../screens/Forms';
import { FormItems } from '../screens/FormsItems';
import { Subscriptions } from '../screens/Subcriptions';
import { Users } from '../screens/Users';

export const LoggedInRoutes = () => (
  <Dashboard>
    <Switch>
      <Route exact path="/" component={Forms} />
      <Route exact path="/form/:formid" component={FormItems} />
      <Route exact path="/subscriptions" component={Subscriptions} />
      <Route exact path="/users" component={Users} />

    </Switch>
  </Dashboard>
)