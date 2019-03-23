import React from 'react';

const title = (props) => {
  const classes = ["card-title", "black-text"].concat(props.classes || []);
  return <span className={classes.join(" ")}>
      {props.children}
    </span>
};

export default title;
