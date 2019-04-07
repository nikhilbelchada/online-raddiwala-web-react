import React from 'react';
import classes from './snackbar.css';

const parseMessage = (message) => {
  var messageString = message;

  if (typeof(message) == "object") {
    var messageObject = message;
    messageString = '';
    for(var msg in messageObject) {
      if(msg != 'status_code') {
        var serverMessage = messageObject[msg];
        serverMessage = typeof(serverMessage) == "object" ? serverMessage[0] : serverMessage;
        if(typeof(serverMessage) == "object")
          messageString += msg + ': ' + serverMessage['error_message'] + '\n';
        else
          messageString += msg + ': ' + serverMessage + '\n';
      }
    }
  }

 return messageString;
}

export const Snackbar = (props) => (<div className={classes.Snackbar}></div>)
export const displayMessage = (message)  => {
  var element = document.getElementsByClassName(classes.Snackbar)[0];

  element.className = [classes.Snackbar, classes.Show].join(" ");
  element.innerText = parseMessage(message);
  setTimeout(function(){
    element.className = classes.Snackbar;
    element.innerText = "";
  }, 3000);
}

