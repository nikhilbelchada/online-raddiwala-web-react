import React from 'react';

import NavItem from './navigation_item/nav_item';

const navItems = (props) => (
  <ul id="nav-mobile" className="right hide-on-med-and-down">
    <NavItem link="/cart">Cart</NavItem>
    <NavItem link="/orders">Order</NavItem>
    <NavItem link="/feedbacks">Feedbacks</NavItem>
    {props.isAdmin ? <NavItem link="/wastes">Waste</NavItem> : null}
    {props.isAdmin ? <NavItem link="/waste-categories">Waste Category</NavItem> : null}
    <NavItem link="/profile">Profile</NavItem>
    <NavItem link="/logout" >({props.username.toUpperCase()}) Logout</NavItem>
  </ul>
);

export default navItems;
