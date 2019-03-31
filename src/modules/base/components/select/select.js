import React from 'react';

import * as classes from './select.css';

const select = (props) => {
  const divClasses = ["col"].concat(props.classes || []);

  return (
    <div className={divClasses.join(" ")}>
      <label>{props.label}</label>

      <select
        className="browser-default"
        onChange={props.onChange}
        value={props.value}
        disabled={props.disabled || false}
        >

        <option value="">{props.defaultLabel}</option>
        { props.rows.map(row => <option value={row.id} key={row.id} disabled={row.disabled || false}>{row.label}</option>) }

      </select>

      { (props.errorMessage || props.successMessage) ?  (
        <span
          className={classes.HelperText}
          >
          {props.errorMessage}
        </span>
      ): null }
    </div>
  );
};

export default select;
