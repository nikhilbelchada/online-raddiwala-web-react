import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Container,
  Row,
  Chip,
  Collapsable,
  Button,
} from '../../../base/components';

import * as wasteActions from '../../../waste/actions/actions';
import * as homeActions from '../../actions/actions';

class Landing extends Component {
  state = {
    wastes: [],
  }

  componentWillMount() {
    this.props.getWastes();
    this.props.getWasteCategories();
    document.addEventListener('DOMContentLoaded', function() {
      window.M.Collapsible.init(document.querySelectorAll('.collapsible'), {});
    });
  }

  handleSelect = (event, waste) => {
    let {wastes} = this.state;
    const index = wastes.indexOf(waste.id);

    if(index !== -1) {
      wastes.splice(index, 1);
    } else {
      wastes.push(waste.id);
    }

    this.setState({wastes});
  }

  performCheckout = (event) => {
    homeActions.setCart(this.state.wastes);
    this.props.history.push("/cart");
  }

  renderContent() {
    const content = this.props.wasteCategories.map(category => {

      const wastes = this.props.wastes.filter(waste => waste.waste_category === category.id).map(waste => {
        const label = this.buildLabel(waste);
        return (
          <Chip
            selected={this.state.wastes.indexOf(waste.id) !== -1}
            key={"w-"+waste.id}
            label={label}
            onClick={event => this.handleSelect(event, waste)}/>
        );
      });

      return {
        header: category.name,
        body: wastes.length > 0 ? wastes : "No waste available",
      };
    });

    return <Collapsable rows={content} />
  }

  buildLabel  = (waste) => {
    return waste.name + " - Rs. " + waste.price + " / " + waste.unit;
  }

  renderSelectedContent() {
    const content = this.props.wastes.filter(waste => this.state.wastes.indexOf(waste.id) !== -1).map(waste => {
      return (
        <Chip
          key={"ws-"+waste.id}
          label={this.buildLabel(waste)}
          onClick={event => this.handleSelect(event, waste)}/>
      );
    });

    return (
      <div>
        Selected Wastes : &nbsp;
        { content.length > 0 ? content : <span className="grey-text">No wastes selected for checkout</span> }
      </div>
    );
  }

  render() {
    return (
      <Container>

        <Row>
           <h2 className="center-align teal-text">Select your wastes...</h2>
        </Row>

        <Row>
          <Button
            onClick={this.performCheckout}
            disabled={this.state.wastes.length === 0 || !homeActions.isCartEmpty()}>
            Checkout
          </Button>
          {
            homeActions.isCartEmpty() ?
            null :
            <span className="grey-text">&nbsp;You cannot checkout, since you have item in your cart</span>
          }
        </Row>

        <Row>
          {this.renderSelectedContent()}
        </Row>

        <Row>
          {this.renderContent()}
        </Row>
      </Container>
    );
  }
}


export default connect(state => {
  return {
    wastes: state.waste.wastes,
    wasteCategories: state.wasteCategory.waste_categories,
  }
}, {
  getWastes: wasteActions.getWastesAction,
  getWasteCategories: wasteActions.getWasteCategoriesAction,
})(Landing);
