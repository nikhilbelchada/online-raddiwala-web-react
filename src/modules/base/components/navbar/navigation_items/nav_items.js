import React from 'react';

import NavItem from './navigation_item/nav_item';

const navItems = (props) => (
  <ul id="nav-mobile" className="right hide-on-med-and-down">
    <NavItem link="/order" >Order</NavItem>
    <NavItem link="/logout" >Logout</NavItem>
  </ul>
);

export default navItems;
