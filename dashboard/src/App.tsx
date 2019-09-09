
import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
// import { DatePicker } from 'antd';
import { Dashboard } from './common/Dashboard';
import { PrivateRoute } from './navigation/PrivateRoute';
import { LoggedInRoutes } from './navigation/Routes';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from './screens/Login';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/show/form/:formid" component={Users} />
          <PrivateRoute component={LoggedInRoutes} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
