import React from 'react';

const container = (props) => {
  const classes = ["container"].concat(props.className || []);
  return <div className={classes.join(" ")}>
      {props.children}
    </div>;
}

export default container;
