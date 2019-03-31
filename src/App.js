import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from './modules/auth/actions/actions';
import allRoutes from './routes';

import {Snackbar} from './modules/base/components/snackbar/snackbar';
import {Spinner} from './modules/base/components/spinner/spinner';


class App extends Component {
  componentDidMount () {
    this.props.autoLogin();
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authStatus.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => dispatch( actions.autoLoginAction() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
