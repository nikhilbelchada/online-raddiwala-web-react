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

import {getUserDetails} from '../../../auth/actions/actions';

class Profile extends Component {
  state = {
    id: null,
    username: '',
    first_name: '',
    last_name: '',
    phone: '',
    address: '',
    email: '',
    errors: {}
  }

  componentDidMount() {
    const userDetails = getUserDetails();
    this.setState({...userDetails})
    window.M.updateTextFields();
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
            disabled
            divClasses={["s12"]}
            />
        </Row>
        <Row>
          <Input
            id="first_name"
            label="First Name"
            for="first_name"
            placeholder="Enter First Name"
            value={this.state.first_name}
            onChange={(event) => this.setState({first_name: event.target.value})}
            divClasses={["s12"]}
            errorMessage={this.state.errors.first_name}
            />
        </Row>
        <Row>
          <Input
            id="last_name"
            label="Last Name"
            for="last_name"
            placeholder="Enter Last Name"
            value={this.state.last_name}
            onChange={(event) => this.setState({last_name: event.target.value})}
            divClasses={["s12"]}
            errorMessage={this.state.errors.last_name}
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

  submit = (event) => {
    if(this.validate()) {
      const {id, username, first_name, last_name, address, phone, email} = this.state;
      this.props.updateDetails({id, username, first_name, last_name, address, phone, email});
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
                <CardTitle>Update Profile</CardTitle>

                {this.buildForm()}

              </CardContent>

              <CardAction>
                <Button onClick={this.submit}>Update</Button>
              </CardAction>

            </Card>

          </Column>

        </Row>
      </Container>
    );
  }

  validate = () => {
    let isValid = true;
    const {email, address, phone} = this.state;
    let errors = {};

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

    console.log(errors);
    this.setState({errors});
    return isValid;

  }
}

const mapStateToProps = state => {
  return { };
};

const mapDispatchToProps = dispatch => {
    return {
      updateDetails: (details) => dispatch(actions.updateAction(details)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
