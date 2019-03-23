import React from 'react';

const content = (props) => {
  const classes = ["card-content"].concat(props.classes || []);
  return <div className={classes.join(" ")}>
      {props.children}
    </div>
};

export default content;
