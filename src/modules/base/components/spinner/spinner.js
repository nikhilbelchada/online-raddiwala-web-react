import React from 'react';

import classes from './spinner.css';

export const Spinner = (props) => (
  <div className={classes.Spinner} id="spinner-div">
    <div className={classes.SpinnerDiv}></div>
  </div>
);

export const startSpinner = () => {
  var element = document.getElementById('spinner-div');
  if(!element) return;
  element.style.display = "block";
}
export const stopSpinner = () => {
  var element = document.getElementById('spinner-div');
  if(!element) return;
  element.style.display = "none";
}
