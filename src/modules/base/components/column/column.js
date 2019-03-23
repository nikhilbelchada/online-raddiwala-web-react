import React from 'react';

const column = (props) => {
  const classes = ["col"].concat(props.classes || []);

  return <div className={classes.join(" ")}>
    {props.children}
  </div>
};

export default column;
