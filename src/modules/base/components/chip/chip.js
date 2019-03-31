import React from 'react';
import * as classes from './chip.css';

const chip = (props) => {
  const divClasses = ["chip", classes.CursorPointer].concat(props.classes);

  if(props.selected) {
    divClasses.push("teal");
    divClasses.push("white-text");
  }

  return (
    <div className={divClasses.join(" ")} onClick={props.onClick}>
      {props.label}
    </div>
  );
}

export default chip;
