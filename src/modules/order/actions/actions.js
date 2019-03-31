import {Http} from '../../../utils/http';
import {API_URL} from '../urls';
import {displaySnackbar, startSpinner, stopSpinner} from '../../base/components';
import * as actionTypes from './action_types';

export function placeOrderAction(data, clearCart) {
  return (dispatch) => {
    startSpinner();
    Http.post(API_URL.orders(), data)
      .then(response => {
        stopSpinner();
        clearCart();
        displaySnackbar("Placed Successfully");
      })
      .catch(response => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      });
  }
}


export function getOrdersAction() {
  return (dispatch) => {
    startSpinner();
    Http.get(API_URL.orders())
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
        displaySnackbar(error.response.data[0]);
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
