import React from 'react';

const input = (props) => {
  const classes = props.classes || [];
  const divClasses = ["input-field", "col"].concat(props.divClasses || []);

  if(props.errorMessage) {
    classes.push("invalid");
  }
  console.log(classes);

  return (
    <div className={divClasses.join(" ")}>

      <input
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        type={props.type || "text"}
        onChange={props.onChange}
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
