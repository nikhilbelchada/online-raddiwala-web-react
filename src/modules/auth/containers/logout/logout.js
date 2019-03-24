import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions/actions';

class Logout extends Component {
  componentDidMount () {
    this.props.logout();
  }

  render () {
    return <Redirect to="/login"/>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logoutAction())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
