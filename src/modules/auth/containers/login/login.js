import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Input from '../../../base/components/input/input';
import Form from '../../../base/components/form/form';
import Container from '../../../base/components/container/container';
import Button from '../../../base/components/button/button';
import Column from '../../../base/components/column/column';
import Row from '../../../base/components/row/row';

import Card from '../../../base/components/card/card';
import CardContent from '../../../base/components/card/content/content';
import CardTitle from '../../../base/components/card/title/title';
import CardAction from '../../../base/components/card/action/action';

class App extends Component {
  state = {
    username: "",
    password: "",
    errors: {}
  }

  submit = (event) => {
    if(this.validate()) {
      console.log("Valid");
    }
    console.log("failed");
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
            errorMessage={this.state.errors.password}
            />
        </Row>
      </Form>
    )
  }

  render() {
    return (
      <Container>

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

export default withRouter(App);
