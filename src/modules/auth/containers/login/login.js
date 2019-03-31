import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
  Aux,
} from '../../../base/components'

class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {}
  }

  componentDidMount() {
    window.M.updateTextFields();
  }

  submit = (event) => {
    if(this.validate()) {
      const {username, password} = this.state;
      this.props.onAuth(username, password);
    }
  }

  buildForm() {
    return (
      <Form>
        <Row>
          <Input
            id="username"
            label="Username"
            for="username"
            value={this.state.username}
            onChange={(event) => this.setState({username: event.target.value})}
            divClasses={["s12"]}
            errorMessage={this.state.errors.username}
            placeholder="Enter Username"
            />
        </Row>
        <Row>
          <Input
            id="password"
            label="Password"
            for="password"
            type="password"
            value={this.state.password}
            onChange={(event) => this.setState({password: event.target.value})}
            divClasses={["s12"]}
            placeholder="Enter Password"
            errorMessage={this.state.errors.password}
            />
        </Row>
      </Form>
    )
  }

  renderLoginForm() {
    return (
      <Aux>
        <Row>
          <h2 className="center-align teal-text">Online Raddiwala</h2>
        </Row>

        <Row>

          <Column classes={["s12", "m6", "offset-m3"]}>

            <Card>
              <CardContent>
                <CardTitle>Sign In</CardTitle>

                {this.buildForm()}

              </CardContent>

              <CardAction>
                <Button onClick={this.submit}>Sign In</Button>
              </CardAction>

            </Card>

          </Column>

        </Row>
      </Aux>
    );
  }

  render() {
    return (
      <Container>
        {
          this.props.isAuthenticated ?  <Redirect to="/" /> : this.renderLoginForm()
        }

      </Container>
    )
  }

  validate () {
    let isValid = true;
    const {username, password} = this.state;
    let errors = {};

    if(!username) {
      errors.username = "Username is mandatory";
      isValid = false;
    }
    if(username && username.length < 4) {
      errors.username = "Mininum 4 characters required";
      isValid = false;
    }

    if(!password) {
      errors.password = "Password is mandatory";
      isValid = false;
    }
    if(password && password.length < 6) {
      errors.password = "Mininum 6 characters required";
      isValid = false;
    }

    this.setState({errors: errors});

    return isValid;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authStatus.token
  };
};

const mapDispatchToProps = dispatch => {
    return {
      onAuth: (username, password) => dispatch(actions.loginAction(username, password)),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Login );
