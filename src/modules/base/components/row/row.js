import React from 'react';

const row = (props) => (
  <div
    className={(props.classes || []).concat(["row"]).join(" ")}>
    {props.children}
  </div>
);

export default row;
