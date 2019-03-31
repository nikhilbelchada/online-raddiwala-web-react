import React from 'react';
import classes from './snackbar.css';

export const Snackbar = (props) => (<div className={classes.Snackbar}></div>)
export const displayMessage = (message)  => {
  var element = document.getElementsByClassName(classes.Snackbar)[0];

  element.className = [classes.Snackbar, classes.Show].join(" ");
  element.innerText = message;
  setTimeout(function(){
    element.className = classes.Snackbar;
    element.innerText = "";
  }, 3000);
}

