import React from 'react';

const action = (props) => {
  const classes = ["card-action"].concat(props.classes || []);
  return <div className={classes.join(" ")}>
      {props.children}
    </div>
};

export default action;
