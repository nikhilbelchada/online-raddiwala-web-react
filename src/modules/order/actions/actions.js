import {Http} from '../../../utils/http';
import {API_URL} from '../urls';
import {displaySnackbar, startSpinner, stopSpinner} from '../../base/components';
import * as actionTypes from './action_types';
var fileDownload = require('react-file-download');

export function placeOrderAction(data, clearCart) {
  return (dispatch) => {
    startSpinner();
    Http.post(API_URL.orders(), data)
      .then(response => {
        stopSpinner();
        clearCart();
        displaySnackbar("Placed Successfully");
      })
      .catch(err => {
        stopSpinner();
        displaySnackbar(err.response.data);
      });
  }
}


export function getOrdersAction(filter={}) {
  return (dispatch) => {
    startSpinner();
    Http.get(API_URL.orders(), filter)
      .then(response => {
        stopSpinner();
        dispatch({
          type: actionTypes.ORDER_DETAILS,
          orders: response.data
        })
      })
      .catch(response => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      })
  }
}

export function downloadOrderReportAction(filter={}) {
  return (dispatch) => {
    startSpinner();
    Http.get(API_URL.download_report(), filter)
      .then(response => {
        stopSpinner();
        fileDownload(response.data, 'export.csv');
      })
      .catch(response => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      })
  }
}

export function getOrderAction(id) {
  return (dispatch) => {
    startSpinner();
    Http.get(API_URL.order(id))
      .then(response => {
        stopSpinner();
        dispatch({
          type: actionTypes.ORDER_DETAIL,
          order: response.data
        })
      })
      .catch(response => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      })
  }
}

export function updateOrderAction(data, history) {
  return (dispatch) => {
    startSpinner();
    Http.put(API_URL.order(data.id), data)
      .then(response => {
        stopSpinner();
        history.push("/orders");
        displaySnackbar("Updated Successfully");
      })
      .catch(error => {
        stopSpinner();
        displaySnackbar(error.response.data);
      });
  }
}

export function updateFeedbackAction(data, history) {
  return (dispatch) => {
    startSpinner();
    Http.put(API_URL.feedback(data.id), data)
      .then(response => {
        stopSpinner();
        history.push("/feedbacks");
        displaySnackbar("Updated Successfully");
      })
      .catch(error => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      });
  }
}
