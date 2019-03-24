import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../../../base/components/navbar/navbar';

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { };
};

const mapDispatchToProps = dispatch => {
  return { };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Home ) );
