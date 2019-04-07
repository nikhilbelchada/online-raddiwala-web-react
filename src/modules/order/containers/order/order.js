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
  Select,
  Input,
  DateTime,
  Aux,
} from '../../../base/components';

import * as wasteActions from '../../../waste/actions/actions';
import * as orderActions from '../../../order/actions/actions';
import {displaySnackbar} from '../../../base/components';

var moment = require('moment');

class Order extends Component {
  state = {
    id: null,
    pickup_date: "",
    order_items: [],
    status: "",
    amount_paid: 0.0,
    errors: {},
    minDate: moment().format('YYYY-MM-DDThh:mm:ss'),
  }

  componentWillMount() {
    const {id} = this.props.match.params;
    if(id && id !== "new") {
      this.props.getOrder(id);
    }
    this.props.getWasteCategories();
    this.props.getWastes();
  }

  componentWillReceiveProps(nextProps) {
    const {id, order_items, pickup_date, status, amount_paid} = nextProps.order;
    if(!this.state.id && id && id.toString() === this.props.match.params.id) {
      this.setState({
        id, order_items, pickup_date: moment(pickup_date).format('YYYY-MM-DDTHH:mm:ss'), status, amount_paid
      });
    }
    if(this.state.id && (id !== this.state.id || id === this.state.id)) {
      this.setState({
        id, order_items, pickup_date: moment(pickup_date).format('YYYY-MM-DDTHH:mm:ss'), status, amount_paid
      });
    }
    window.M.updateTextFields();
  }

  updateQuantity = (id, quantity) => {
    const {order_items} = this.state;
    for(let i = 0; i < order_items.length; i++) {
      if(order_items[i].id === id) {
        order_items[i].quantity = quantity
      }
    }
    this.setState({order_items});
  }

  removeItem = (id) => {
    const {order_items} = this.state;
    let index = -1;

    for(let i = 0; i < order_items.length; i++) {
      if(order_items[i].id === id) {
        index = i;
      }
    }

    order_items.splice(index, 1);

    this.setState({order_items});
  }

  renderAmountPaidLabel = () => {
    let amount = 0;
    const {order_items} = this.state;
    for(let i = 0;i < order_items.length; i++) {
      amount += parseFloat(order_items[i].quantity) * order_items[i].waste_price;
    }
    return <div>Amount Paid will be Rs. {amount}<br/></div>
  }

  buildOrderItems = () => {
    return this.state.order_items.map(item => {
      return (
        <Aux key={item.id}>
          <Row>
            <Column classes={["s3"]}>{item.waste_name}</Column>
            <Column classes={["s3"]}>{"Rs. " + item.waste_price + " per " + item.waste_unit}</Column>
            <Column classes={["s3"]}>
              <Input
                id={item.id}
                label="Quantity"
                for={item.id}
                type="number"
                value={item.quantity}
                onChange={(event) => this.updateQuantity(item.id, event.target.value)}
                divClasses={["s12"]}
                placeholder="Enter Quantity"
                />
            </Column>
            {this.state.status === 'CREATED' ? <Column classes={["s3"]}>
              <div
                className="btn-floating waves-effect waves-light red right"
                onClick={event => this.removeItem(item.id)}>
                <i className="material-icons right">delete</i>
              </div>
            </Column> : null}
          </Row>
          <hr />
        </Aux>
      )
    })
  }

  submit = () => {
    if(this.validate()) {
      const {pickup_date, order_items, status, amount_paid, id} = this.state;
      this.props.updateOrder({
        pickup_date,
        order_items,
        user: this.props.user.id,
        status,
        amount_paid,
        id
      }, this.props.history);
    }
  }

  render() {
    const isAdmin = this.props.user.admin;
    const statuses = [
      {id: "CREATED", label: "Created", disabled: !isAdmin},
      {id: "ACCEPTED", label: "Accepted", disabled: !isAdmin},
      {id: "CANCELLED", label: "Cancelled"},
      {id: "COMPLETE", label: "Complete", disabled: !isAdmin},
    ]
    return (
      <Container>

        <Row>
           <h2 className="center-align teal-text">Order</h2>
        </Row>

        <Row>
          <Column classes={["s12", "m6", "offset-m3"]}>

            <Card>
              <CardContent>
                <CardTitle>Order Items</CardTitle>
                <br />

                {this.buildOrderItems()}

                <Row>
                  <DateTime
                    id="pickupdate"
                    label="Pickup Date"
                    for="pickupdate"
                    min={this.state.minDate}
                    value={this.state.pickup_date}
                    disabled={['CANCELLED', 'COMPLETE'].indexOf(this.state.status) !== -1}
                    onChange={(event) => this.setState({pickup_date: event.target.value})}
                    divClasses={["s12"]}
                    placeholder="Enter Pickup Datetime"
                    errorMessage={this.state.errors.pickup_date}
                    />
                </Row>

                <Row>
                  <Select
                    classes={["s12"]}
                    label="Status"
                    rows={statuses}
                    defaultLabel="Select Status"
                    onChange={(event) => {
                      const status = event.target.value;
                      let {amount_paid} = this.state;
                      if(status !== 'COMPLETE') {
                        amount_paid = 0.0;
                      }
                      this.setState({status, amount_paid});
                    }}
                    value={this.state.status}
                    errorMessage={this.state.errors.status}
                    />
                </Row>

                { isAdmin ? <Row>
                  <Input
                    id="amountpaid"
                    label="Amount Paid"
                    type="number"
                    for="amountpaid"
                    value={this.state.amount_paid}
                    onChange={(event) => this.setState({amount_paid: event.target.value})}
                    disabled={this.state.status !== 'COMPLETE'}
                    divClasses={["s12"]}
                    placeholder="Enter Amount Paid"
                    errorMessage={this.state.errors.amount_paid}
                    />
                </Row> : this.renderAmountPaidLabel() }

              </CardContent>

              <CardAction>
                <Button onClick={this.submit}>Update Order</Button>
              </CardAction>

            </Card>

          </Column>
        </Row>

      </Container>
    );
  }

  validate = () => {
    let isValid = true;
    const {order_items, amount_paid, status, pickup_date} = this.state;
    let errors = {};

    if(order_items.filter(item => item.quantity <= 0).length > 0) {
      isValid = false;
      displaySnackbar("quantity must be greater than 0");
    }
    if(order_items.length === 0) {
      isValid = false;
      displaySnackbar("There must be atleast one order item preset");
    }

    if(!pickup_date) {
      isValid = false;
      errors.pickup_date = "Pickup date is mandatory"
    }
    if(amount_paid <= 0 && status === 'COMPLETE') {
      isValid = false;
      errors.amount_paid = "Amount paid must be greater than 0"
    }

    if(!status || status === "") {
      isValid = false;
      errors.status = "Status is mandatory"
    }
    if(amount_paid > 0 && status === 'COMPLETE') {
      let amount = 0;
      for(let i = 0; i < order_items.length; i++) {
        amount += (parseFloat(order_items[i].quantity) * order_items[i].waste_price);
      }
      if(amount_paid != amount) {
        isValid = false;
        errors.amount_paid = "Amount paid must match sum of order item i.e " + amount;
      }
    }

    this.setState({errors});
    return isValid;
  }
}

export default connect(state => {
  return {
    wastes: state.waste.wastes,
    waste_categories: state.wasteCategory.waste_categories,
    user: state.user.profile,
    order: state.order.order,
  }
}, {
  getWastes: wasteActions.getWastesAction,
  getWasteCategories: wasteActions.getWasteCategoriesAction,
  getOrder: orderActions.getOrderAction,
  updateOrder: orderActions.updateOrderAction,
})(Order);
