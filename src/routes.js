import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './modules/auth/containers/login/login';
import Logout from './modules/auth/containers/logout/logout';
import Home from './modules/home/components/home/home';

const allRoutes = (isAuthenticated) => {
  if(isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/logout" exact component={Logout} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Logout} />
        <Redirect to="/login" />
      </Switch>
    );
  }
};

export default allRoutes;
