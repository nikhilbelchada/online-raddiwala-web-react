import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './modules/auth/containers/login/login';
import Logout from './modules/auth/containers/logout/logout';
import Register from './modules/auth/containers/register/register';
import Home from './modules/home/containers/home/home';

const allRoutes = (isAuthenticated, requestPath) => {
  if(isAuthenticated) {
    return (
      <Switch>
        <Route path="/logout" exact component={Logout} />
        <Route path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    );
  } else if(isAuthenticated === undefined) {
    return (
      <Switch>
        <Redirect to={requestPath} />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/register" exact component={Register} />
        <Redirect to="/login" />
      </Switch>
    );
  }
};

export default allRoutes;
