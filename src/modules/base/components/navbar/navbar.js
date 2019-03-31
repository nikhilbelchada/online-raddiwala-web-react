import React from 'react';
import { NavLink } from 'react-router-dom';

import NavItems from './navigation_items/nav_items';

const navbar = (props) => (
  <nav>
    <div className="nav-wrapper teal darket-4">
      <NavLink to="/" className="brand-logo">Online Raddiwala</NavLink>
      <NavItems isAdmin={props.isAdmin} username={props.username}/>
    </div>
  </nav>
);

export default navbar;
