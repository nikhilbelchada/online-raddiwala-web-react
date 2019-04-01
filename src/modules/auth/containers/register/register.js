import React, { Component } from 'react';
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
  Aux,
} from '../../../base/components'

class Register extends Component {
  state = {
    username: "",
    password: "",
    confirm_password: "",
    phone: "",
    email: "",
    address: "",
    errors: {}
  }

  componentDidMount() {
    window.M.updateTextFields();
  }

  submit = (event) => {
    if(this.validate()) {
      const {username, password, email, address, phone} = this.state;
      this.props.register({username, password, email, address, phone}, this.props.history);
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
        <Row>
          <Input
            id="confirmpassword"
            label="Confirm Password"
            for="confirmpassword"
            type="password"
            value={this.state.confirm_password}
            onChange={(event) => this.setState({confirm_password: event.target.value})}
            divClasses={["s12"]}
            placeholder="Enter Confirm Password"
            errorMessage={this.state.errors.confirm_password}
            />
        </Row>
        <Row>
          <Input
            id="email"
            label="Email"
            for="email"
            placeholder="Enter Email"
            value={this.state.email}
            onChange={(event) => this.setState({email: event.target.value})}
            divClasses={["s12"]}
            errorMessage={this.state.errors.email}
            />
        </Row>
        <Row>
          <Input
            id="address"
            label="Address"
            placeholder="Enter Address"
            for="address"
            value={this.state.address}
            onChange={(event) => this.setState({address: event.target.value})}
            divClasses={["s12"]}
            errorMessage={this.state.errors.address}
            />
        </Row>
        <Row>
          <Input
            id="phone"
            label="Phone"
            for="phone"
            placeholder="Enter Phone"
            type="number"
            value={this.state.phone}
            onChange={(event) => this.setState({phone: event.target.value})}
            divClasses={["s12"]}
            errorMessage={this.state.errors.phone}
            />
        </Row>
      </Form>
    )
  }

  renderRegisterForm() {
    return (
      <Aux>
        <Row>
          <h2 className="center-align teal-text">Register</h2>
        </Row>

        <Row>

          <Column classes={["s12", "m6", "offset-m3"]}>

            <Card>
              <CardContent>
                <CardTitle>Sign Up</CardTitle>

                {this.buildForm()}

              </CardContent>

              <CardAction>
                <Button onClick={this.submit}>Sign Up</Button>
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
        {this.renderRegisterForm()}
      </Container>
    )
  }

  validate () {
    let isValid = true;
    const {username, password, confirm_password, email, address, phone} = this.state;
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
    if(!confirm_password) {
      errors.confirm_password = "Confirm Password is mandatory";
      isValid = false;
    }
    if(confirm_password !== password) {
      errors.confirm_password = "Confirm Password donot match password";
      isValid = false;
    }

    if(!/^\S+@\S+$/.test(email)) {
      isValid = false;
      errors.email = "Enter Valid Email Address";
    }

    if(!address) {
      isValid = false;
      errors.address = "Address is mandatory";
    }

    if(!phone) {
      isValid = false;
      errors.phone = "Phone Number is mandatory";
    } else if(phone.length < 10 || phone.length > 10) {
      isValid = false;
      errors.phone = "Enter 10 digit phone number";
    }

    this.setState({errors: errors});

    return isValid;
  }
}

export default connect(null, {
  register: actions.registerAction,
})( Register );
