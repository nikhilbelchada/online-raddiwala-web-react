import React from 'react';

const datetime = (props) => {
  const classes = props.classes || [];
  const divClasses = ["col"].concat(props.divClasses || []);

  if(props.errorMessage) {
    classes.push("invalid");
  }

  return (
    <div className={divClasses.join(" ")}>

      <label
        htmlFor={props.for || ""}>
        {props.label || "Label Needed"}
      </label>

      <input
        id={props.id}
        value={props.value}
        placeholder={props.placeholder || "Add Placeholder"}
        type="datetime-local"
        onChange={props.onChange}
        min={props.min || ""}
        disabled={props.disabled || false}
        className={classes.join(" ")}/>


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

export default datetime;
