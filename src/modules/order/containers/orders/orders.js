import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Table,
  Container,
  Row,
} from '../../../base/components';

import * as actions from '../../actions/actions';

class Orders extends Component {
  componentWillMount() {
    this.props.getOrders();
  }


  render() {
    const headers = [
      {name: "User", key: "username", isLink: true, linkKey: "id", linkPath: "/orders/"},
      {name: "Order Date", key: "order_date", type: 'datetime'},
      {name: "Pickup Date", key: "pickup_date", type: 'datetime'},
      {name: "Amount Paid", key: "amount_paid"},
      {name: "Status", key: "status"},
    ];

    return (
      <Container>
        <Row>
           <h2 className="center-align teal-text">Orders</h2>
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
    orders: state.order.orders,
  }
}, {
  getOrders: actions.getOrdersAction,
})(Orders);
