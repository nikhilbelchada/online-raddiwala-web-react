import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/actions';

import {
  Input,
  Form,
  Container,
  Button,
  Column,
  Row,
  Card,
  CardContent,
  CardTitle,
  CardAction ,
} from '../../../base/components'


class ChangePassword extends Component {
  state = {
    old_password: "",
    new_password: "",
    confirm_password: "",
    errors: {}
  }

  componentDidMount() {
    window.M.updateTextFields();
  }

  componentWillMount() {
    const {id} = this.props.match.params;
    if(id && id !== "new") {
      this.props.getUser(id);
    }
  }

  buildForm() {
    return (
      <Form>
      {this.props.profile_user.admin ? null : <Row>
          <Input
            id="old_password"
            label="Old Password"
            for="old_password"
            type="password"
            placeholder="Enter Old Password"
            value={this.state.old_password}
            divClasses={["s12"]}
            errorMessage={this.state.errors.old_password}
            onChange={(event) => this.setState({old_password: event.target.value})}
            />
        </Row> }
        <Row>
          <Input
            id="new_password"
            label="New Password"
            for="new_password"
            type="password"
            placeholder="Enter New Password"
            value={this.state.new_password}
            divClasses={["s12"]}
            errorMessage={this.state.errors.new_password}
            onChange={(event) => this.setState({new_password: event.target.value})}
            />
        </Row>
        <Row>
          <Input
            id="confirm_password"
            label="Confirm Password"
            for="confirm_password"
            type="password"
            placeholder="Enter Confirm Password"
            value={this.state.confirm_password}
            divClasses={["s12"]}
            errorMessage={this.state.errors.confirm_password}
            onChange={(event) => this.setState({confirm_password: event.target.value})}
            />
        </Row>
      </Form>
    )
  }

  submit = (event) => {
    if(this.validate()) {
      const {old_password, new_password} = this.state;
      this.props.changePassword({old_password, new_password, id: this.props.user.id});
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <h2 className="center-align teal-text">Profile</h2>
        </Row>

        <Row>

          <Column classes={["s12", "m6", "offset-m3"]}>

            <Card>
              <CardContent>
                <CardTitle>Change Password for {this.props.user.username}</CardTitle>

                {this.buildForm()}

              </CardContent>

              <CardAction>
                <Button onClick={this.submit}>Update</Button> &nbsp;
              </CardAction>

            </Card>

          </Column>

        </Row>
      </Container>
    );
  }

  validate = () => {
    let isValid = true;
    const {old_password, new_password, confirm_password} = this.state;
    let errors = {};
    const isAdmin = this.props.profile_user.admin;

    if(!old_password && !isAdmin) {
      isValid = false;
      errors.old_password = "Old Password is mandatory";
    }
    if(!new_password) {
      isValid = false;
      errors.new_password = "New Password is mandatory";
    }else if(new_password.length < 6) {
      isValid = false;
      errors.new_password = "New Password must be min 6 characters";
    }
    if(!confirm_password) {
      isValid = false;
      errors.confirm_password = "Confirm Password is mandatory";
    } else if(confirm_password !== new_password) {
      isValid = false;
      errors.confirm_password = "Confirm Password don't match with New Password";
    }

    if(old_password === new_password && isAdmin) {
      isValid = false;
      errors.new_password = "New Password cannot be same as Old Password";
    }

    this.setState({errors});
    return isValid;

  }
}

export default connect(state => {
  return {
    user: state.user.user,
    profile_user: state.user.profile,
  };
}, {
  changePassword: actions.changePasswordAction,
  getUser: actions.getUserAction,
})(ChangePassword);
