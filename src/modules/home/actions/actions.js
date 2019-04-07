//import * as actionTypes from './action_types';
import {Http} from '../../../utils/http';
import {API_URL} from '../urls';
import {displaySnackbar, startSpinner, stopSpinner} from '../../base/components';
import * as actionTypes from './action_types';


/* Actions */
export const updateAction = (details) => {
  return dispatch => {
    startSpinner();
    const userData = {
      first_name: details.first_name,
      last_name: details.last_name,
      email: details.email,
      address: details.address,
      phone: details.phone,
      username: details.username,
    };

    Http.put(API_URL.user_detail(details.id), userData)
      .then(response => {
        stopSpinner();
        displaySnackbar("Details updated successfully");
        dispatch({
          type: actionTypes.USER_DETAIL,
          user: response.data,
        })
      })
      .catch(err => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      });
  };
};

export const changePasswordAction = (details) => {
  return dispatch => {
    startSpinner();
    const data = {
      old_password: details.old_password,
      new_password: details.new_password,
    };

    Http.put(API_URL.change_password(details.id), data)
      .then(response => {
        stopSpinner();
        displaySnackbar("Password updated successfully");
      })
      .catch(err => {
        stopSpinner();
        displaySnackbar(err.response.data);
      });
  };
};

export function getUsersAction() {
  return (dispatch) => {
    startSpinner();
    Http.get(API_URL.users())
      .then(response => {
        stopSpinner();
        dispatch({
          type: actionTypes.USER_DETAILS,
          users: response.data
        })
      })
      .catch(response => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      })
  }
}

export function getUserAction(id) {
  return (dispatch) => {
    startSpinner();
    Http.get(API_URL.user_detail(id))
      .then(response => {
        stopSpinner();
        dispatch({
          type: actionTypes.USER_DETAIL,
          user: response.data
        })
      })
      .catch(response => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      })
  }
}

export function getProfileAction(id) {
  return (dispatch) => {
    startSpinner();
    Http.get(API_URL.user_detail(id))
      .then(response => {
        stopSpinner();
        dispatch({
          type: actionTypes.PROFILE_DETAIL,
          profile: response.data
        })
      })
      .catch(response => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      })
  }
}

export const setCart = (wastes) => {
  localStorage.setItem("cart", wastes);
}

export const isCartEmpty = () => {
  return !localStorage.hasOwnProperty('cart');
}

export const clearCart = () => {
  localStorage.removeItem("cart");
}

export const getCartItems = () => {
  const cart = localStorage.getItem("cart") || "";
  return cart.split(",");
};

