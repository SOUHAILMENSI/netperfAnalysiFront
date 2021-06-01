import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import axios from 'axios';

import Login from './Login';
import Dashboard from './components/Dashboard';
import Dashboardqoe from './components/Dashboardqoe';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';


function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`${process.env.REACT_APP_BACK_URI}/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
      
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="content">
            <Switch>
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/qosDashboard" component={Dashboard} />
              <PrivateRoute path="/qoeDashboard" component={Dashboardqoe} />

            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div> 
  );
}

export default App;
