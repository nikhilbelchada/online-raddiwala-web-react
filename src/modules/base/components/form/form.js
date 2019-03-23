import React from 'react';

const form = (props) => {
  const classes = props.classes || [];
  return <form className={classes.join(" ")}>
      {props.children}
    </form>
};

export default form;
