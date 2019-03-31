import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Table,
  Container,
  Row,
} from '../../../base/components';

import * as actions from '../../actions/actions';

class Feedbacks extends Component {
  componentWillMount() {
    this.props.getOrders();
  }


  render() {
    const headers = [
      {name: "Order", key: "id", isLink: true, linkKey: "id", linkPath: "/feedbacks/"},
      {name: "User", key: "username", isLink: true, linkKey: "id", linkPath: "/orders/"},
      {name: "Order Date", key: "order_date", type: 'datetime'},
      {name: "Amount Paid", key: "amount_paid"},
      {name: "Feedback", key: "feedback"},
      {name: "Reply", key: "reply"},
    ];

    return (
      <Container>
        <Row>
           <h2 className="center-align teal-text">Feedback</h2>
        </Row>

        <Row>
          <Table headers={headers} rows={this.props.orders}/>
        </Row>
      </Container>
    );
  }

}

export default connect(state => {
  return {
    orders: state.order.orders.filter(order => order.status === 'COMPLETE' || order.status === 'CANCELLED'),
  }
}, {
  getOrders: actions.getOrdersAction,
})(Feedbacks);
