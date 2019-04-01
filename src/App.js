import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from './modules/auth/actions/actions';
import allRoutes from './routes';

import {Snackbar} from './modules/base/components/snackbar/snackbar';
import {Spinner} from './modules/base/components/spinner/spinner';


class App extends Component {
  componentDidMount () {
    this.props.autoLogin(this.props.history);
  }

  render() {
    return (
      <div>
        {<Snackbar />}
        {<Spinner/>}
        {allRoutes(this.props.isAuthenticated, this.props.location.pathname)}
      </div>
    );
  }
}


export default withRouter(connect(state => {
  return {
    isAuthenticated: state.authStatus.token
  };
}, {
  autoLogin: actions.autoLoginAction,
})( App ) );
