import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/actions';

import {
  Container,
  Button,
  Row,
  Table,
} from '../../../base/components'


class Users extends Component {
  componentWillMount() {
    this.props.getUsers();
  }
  render() {
    const headers = [
      {name: "Username", key: "username", isLink: true, linkKey: "id", linkPath: "/users/" },
      {name: "Email", key: "email"},
    ];

    return (
      <Container>
        <Row>
           <h2 className="center-align teal-text">Users</h2>
        </Row>

        <Row>
          <Button
            type="link"
            to="/profile/new">
            Create New
          </Button>
        </Row>

        <Row>
          <Table headers={headers} rows={this.props.users}/>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users
  };
};

const mapDispatchToProps = dispatch => {
    return {
      getUsers: () => dispatch(actions.getUsersAction()),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Users );
