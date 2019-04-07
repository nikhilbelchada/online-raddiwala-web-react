import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
  Container,
  Button,
  Row,
  Table,
  Select,
} from '../../../base/components'


import * as orderActions from '../../../order/actions/actions';

class OrderReport extends Component {
  state = {
    statuses: [
      {id: "CREATED", label: "Created"},
      {id: "ACCEPTED", label: "Accepted"},
      {id: "CANCELLED", label: "Cancelled"},
      {id: "COMPLETE", label: "Complete"},
    ],
    status: "",
  }

  componentWillMount() {
    this.props.getOrders();
  }

  getReport = (event) => {
    this.props.getOrders({status: this.state.status});
  }
  downloadReport = (event) => {
    this.props.downloadOrderReport({status: this.state.status});
  }

  render() {
    const headers = [
      {name: "User Name", key: "username", isLink: true, linkKey: "id", linkPath: "/orders/" },
      {name: "Status", key: "status"},
      {name: "Amount Paid", key: "amount_paid"},
      {name: "Order Date", key: "order_date", type: "datetime"},
      {name: "Pickup Date", key: "pickup_date", type: "datetime"},
      {name: "Feedback", key: "feedback"},
    ];

    return (
      <Container>
        <Row>
           <h2 className="center-align teal-text">Order Report</h2>
        </Row>

        <Row>
          <Select
            classes={["s4"]}
            label="Order Status"
            rows={this.state.statuses}
            onChange={(event) => this.setState({status: event.target.value})}
            defaultLabel="Select Status"
            value={this.state.status}
            />
        </Row>
        <Row>
            <Button onClick={this.getReport}>Get Report</Button>
            &nbsp;
            <Button onClick={this.downloadReport}>Download Report</Button>
        </Row>

        <Row>
          <Table headers={headers} rows={this.props.orders}/>
        </Row>
      </Container>
    );
  }
}

export default connect( state => {
  return {
    orders: state.order.orders,
  };
}, {
  getOrders: orderActions.getOrdersAction,
  downloadOrderReport: orderActions.downloadOrderReportAction,
} )( OrderReport );
