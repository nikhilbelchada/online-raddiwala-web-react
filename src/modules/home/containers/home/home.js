import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  NavBar,
  Aux,
} from '../../../base/components';

import Profile from '../../containers/profile/profile';
import Landing from '../../containers/landing/landing';

import WasteCategory from '../../../waste/containers/waste_category/waste_category';
import WasteCategories from '../../../waste/containers/waste_categories/waste_categories';

import Wastes from '../../../waste/containers/wastes/wastes';
import Waste from '../../../waste/containers/waste/waste';

import Cart from '../../../cart/containers/cart/cart';

import Order from '../../../order/containers/order/order';
import Orders from '../../../order/containers/orders/orders';

import Feedbacks from '../../../order/containers/feedbacks/feedbacks';
import Feedback from '../../../order/containers/feedback/feedback';

import Users from '../../containers/users/users';

import ChangePassword from '../../containers/change_password/change_password';

import Reports from '../../../report/components/reports/reports';
import OrderReport from '../../../report/containers/order_report/order_report';


class Home extends Component {
  render() {
    return (
      <div>
        <NavBar
          isAdmin={this.props.user.admin || false}
          username={this.props.user.username || ""}
          userid={this.props.user.id}/>

        {this.routes()}
      </div>
    );
  }

  routes() {
    return (
      <Aux>
        <Route path="/" exact component={Landing} />
        <Route path="/profile/:id" exact component={Profile} />

        <Route path="/waste-categories" exact component={WasteCategories} />
        <Route path="/waste-categories/:id" exact component={WasteCategory} />

        <Route path="/wastes" exact component={Wastes} />
        <Route path="/wastes/:id" exact component={Waste} />

        <Route path="/cart" exact component={Cart} />

        <Route path="/orders" exact component={Orders} />
        <Route path="/orders/:id" exact component={Order} />

        <Route path="/feedbacks" exact component={Feedbacks} />
        <Route path="/feedbacks/:id" exact component={Feedback} />

        <Route path="/users" exact component={Users} />
        <Route path="/users/:id" exact component={Profile} />

        <Route path="/changepassword/:id" exact component={ChangePassword} />

        <Route path="/reports" exact component={Reports} />
        <Route path="/reports/order" exact component={OrderReport} />
      </Aux>
    );
  }
}

export default connect(state => {
  return {
    user: state.user.profile,
  };
}, null)(Home);
