import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from './modules/auth/actions/actions';
import allRoutes from './routes';


class App extends Component {
  componentDidMount () {
    this.props.autoLogin();
  }

  render() {
    return (
      <div>
        {allRoutes(this.props.isAuthenticated)}
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
