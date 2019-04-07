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
  DateTime,
  Aux,
} from '../../../base/components';

import * as wasteActions from '../../../waste/actions/actions';
import * as homeActions from '../../../home/actions/actions';
import {displaySnackbar} from '../../../base/components';
import * as orderActions from '../../../order/actions/actions';

var moment = require('moment');

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      pickup_date: moment().format('YYYY-MM-DDTHH:mm:ss'),
      errors: {},
      minDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
    };
  }

  dateTimeToString(datetime) {
    return datetime.getFullYear() + "-" + this.makeTwoDigits(datetime.getMonth()) + "-" +
      this.makeTwoDigits(datetime.getDate()) + "T" +
      this.makeTwoDigits(datetime.getHours()) + ":" +
      this.makeTwoDigits(datetime.getMinutes()) + ":" +
      this.makeTwoDigits(datetime.getSeconds())
  }

  makeTwoDigits(value) {
    if(value.toString().length === 1) return "0"+value;

    return value;
  }

  componentWillMount() {
    this.props.getWastes();
    this.props.getWasteCategories();
  }

  componentWillReceiveProps(nextProps) {
    const items = homeActions.getCartItems();

    if(items.length > 0 && nextProps.wastes.length > 0) {
      const selectedItems = nextProps.wastes.filter(waste => items.indexOf(waste.id.toString()) !== -1);

      this.setState({
        items: selectedItems.map(item => ({
          id: item.id,
          waste: item.id,
          unit: item.unit,
          price: item.price,
          quantity: 0.00,
          name: item.name
        }))
      });
    }
    window.M.updateTextFields();
  }

  updateQuantity = (id, quantity) => {
    const {items} = this.state;
    for(let i = 0; i < items.length; i++) {
      if(items[i].id === id) {
        items[i].quantity = quantity
      }
    }
    this.setState({items: items});
  }

  buildCart() {
    if(homeActions.isCartEmpty()) return <span className="grey-text">Your Cart is empty..</span>;

    const items = this.state.items.map(item => {
      return (
        <Aux key={item.id}>
          <Row>
            <Column classes={["s4"]}>{item.name}</Column>
            <Column classes={["s4"]}>{item.price + " per " + item.unit}</Column>
            <Column classes={["s4"]}>
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
          </Row>
          <hr />
        </Aux>
      )
    });
    items.push(<Row>
      <DateTime
        id="pickupdate"
        label="Pickup Date"
        for="pickupdate"
        min={this.state.minDate}
        value={this.state.pickup_date}
        onChange={(event) => this.setState({pickup_date: event.target.value})}
        divClasses={["s12"]}
        placeholder="Enter Pickup Datetime"
        errorMessage={this.state.errors.pickup_date}
        />
    </Row>
    );
    return items;
  }

  clearCart = (event) => {
    homeActions.clearCart();
    this.props.history.push("/orders");
  }

  submit = () => {
    if(this.validate()) {
      const {pickup_date, items} = this.state;
      this.props.placeOrder({
        pickup_date,
        order_items: items.map(item => {
          delete(item.id);
          return item;
        }),
        user: this.props.user.id},
        this.clearCart
      );
    }
  }

  renderPaidAmount = () => {
    if(homeActions.isCartEmpty()) return;

    let amount = 0;
    const {items} = this.state;
    for(let i = 0;i < items.length; i++) {
      amount += parseFloat(items[i].quantity) * items[i].price;
    }
    return <div>Amount Paid will be Rs. {amount}</div>
  }

  render() {
    return (
      <Container>

        <Row>
           <h2 className="center-align teal-text">Your Cart</h2>
        </Row>

        <Row>
          <Column classes={["s12", "m6", "offset-m3"]}>

            <Card>
              <CardContent>
                <CardTitle>Cart Items</CardTitle>
                <br />

                {this.buildCart()}

                {this.renderPaidAmount()}

              </CardContent>

              {
                homeActions.isCartEmpty() ?
                null :
                <CardAction>
                  <Button onClick={this.submit}>Place Order</Button>
                  &nbsp;&nbsp;
                  <Button onClick={this.clearCart} classes={["red"]}>Clear Cart</Button>
                </CardAction>
              }

            </Card>

          </Column>
        </Row>

      </Container>
    );
  }

  validate = () => {
    let isValid = true;
    const {items, pickup_date} = this.state;
    let errors = {};

    if(items.filter(item => item.quantity <= 0).length > 0) {
      isValid = false;
      displaySnackbar("quantity must be greater than 0");
    }

    if(!pickup_date) {
      isValid = false;
      errors.pickup_date = "Pickup date is mandatory"
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
  }
}, {
  getWastes: wasteActions.getWastesAction,
  getWasteCategories: wasteActions.getWasteCategoriesAction,
  placeOrder: orderActions.placeOrderAction,
})(Cart);
