import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './App.css';

import Login from './modules/auth/containers/login/login';

class App extends Component {
  render() {
    return (
      <Login />
    );
  }
}

export default withRouter(App);
