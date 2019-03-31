import React from 'react';
import { Link } from 'react-router-dom';

const button = (props) => {
  let button =  (
    <button
      disabled={props.disabled || false}
      onClick={props.onClick}
      className={(props.classes || []).concat(["waves-effect", "waves-light", "btn"]).join(" ")}>
      {props.children}
    </button>
  );

  if(props.type === "link"){
    button = <Link to={props.to}>{button}</Link>
  }

  return button;
};

export default button;
