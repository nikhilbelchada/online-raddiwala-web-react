import React from 'react';

const button = (props) => (
  <button
    onClick={props.onClick}
    className={(props.classes || []).concat(["waves-effect", "waves-light", "btn"]).join(" ")}>
    {props.children}
  </button>
);

export default button;
