import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
  Container,
  Row,
  Button,
  Column,
  Card,
  CardContent,
  CardTitle,
  CardAction ,
  Input,
  Form,
} from '../../../base/components';

import { Link } from 'react-router-dom';

import * as authActions from '../../../auth/actions/actions';
import * as orderActions from '../../../order/actions/actions';

class Feedback extends Component {
  state = {
    id: "",
    feedback: "",
    reply: "",
    errors: {},
  }

  componentWillMount() {
    const {id} = this.props.match.params;
    if(id && id !== "new") {
      this.props.getOrder(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {id, feedback, reply} = nextProps.order;
    if(!this.state.id && id && id.toString() === this.props.match.params.id) {
      this.setState({id, feedback, reply });
    }
  }

  componentDidMount() {
    window.M.updateTextFields();
  }

  submit = () => {
    if(this.validate()) {
      const {id, feedback, reply} = this.state;
      this.props.updateFeedback({id, feedback, reply}, this.props.history);
    }
  }

  buildFeedback = (isAdmin) => {
    return (
      <Form>
         <Row>
            <Link to={"/orders/"+this.state.id}>
              Feedback for order {this.state.id}
            </Link>
         </Row>
        <Row>
          <Input
            id="feedback"
            label="Feedback"
            for="feedback"
            value={this.state.feedback || ""}
            placeholder="Enter Feedback"
            onChange={(event) => this.setState({feedback: event.target.value})}
            divClasses={["s12"]}
            errorMessage={this.state.errors.feedback}
            />
        </Row>
        <Row>
          <Input
            id="reply"
            label="Reply"
            disabled={!isAdmin}
            for="reply"
            placeholder="Enter Reply"
            value={this.state.reply || ""}
            onChange={(event) => this.setState({reply: event.target.value})}
            divClasses={["s12"]}
            errorMessage={this.state.errors.description}
            />
        </Row>
      </Form>
    );
  }

  render() {
    const isAdmin = authActions.isAdmin();
    return (
      <Container>

        <Row>
           <h2 className="center-align teal-text">Feedback</h2>
        </Row>

        <Row>
          <Column classes={["s12", "m6", "offset-m3"]}>

            <Card>
              <CardContent>
                <CardTitle>Feedback</CardTitle>
                <br />

                {this.buildFeedback(isAdmin)}


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
    const {feedback} = this.state;
    let errors = {};

    if(!feedback) {
      isValid = false;
      errors.feedback = "Feedback is mandatory";
    }

    this.setState({errors});
    return isValid;
  }
}

export default connect(state => {
  return {
    order: state.order.order,
  }
}, {
  getOrder: orderActions.getOrderAction,
  updateFeedback: orderActions.updateFeedbackAction,
})(Feedback);
