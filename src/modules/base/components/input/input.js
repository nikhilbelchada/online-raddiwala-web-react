import React from 'react';

const input = (props) => {
  const classes = props.classes || [];
  const divClasses = ["input-field", "col", "active"].concat(props.divClasses || []);

  if(props.errorMessage) {
    classes.push("invalid");
  }

  return (
    <div className={divClasses.join(" ")}>

      <input
        id={props.id}
        value={props.value}
        placeholder={props.placeholder || "Add Placeholder"}
        type={props.type || "text"}
        onChange={props.onChange}
        disabled={props.disabled || false}
        className={classes.join(" ")}/>

      <label
        htmlFor={props.for || ""}>
        {props.label || "Label Needed"}
      </label>

      { (props.errorMessage || props.successMessage) ?  (
        <span
          className="helper-text"
          data-error={props.errorMessage}
          data-success={props.successMessage}>
        </span>
      ): null }
    </div>
  );
}

export default input;
