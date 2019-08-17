
import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
// import { DatePicker } from 'antd';
import { Dashboard } from './common/Dashboard';

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Login } from './screens/Login';

function App() {
  return (
    <>
      <Router>
        <Route path="/login/" component={Login} />
        <Route component={Dashboard} />
      </Router>
    </>
  );
}

export default App;
