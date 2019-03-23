import React from 'react';

const card = (props) => {
  const classes = ["card"].concat(props.classes || []);
  return <div className={classes.join(" ")}>
      {props.children}
    </div>
};

export default card;
