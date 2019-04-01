//import * as actionTypes from './action_types';
import {Http} from '../../../utils/http';
import {API_URL} from '../urls';
import {displaySnackbar, startSpinner, stopSpinner} from '../../base/components';

import {updateUserDetails} from '../../auth/actions/actions';

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
        updateUserDetails(response.data.user_details);
        displaySnackbar("Details updated successfully");
      })
      .catch(err => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      });
  };
};


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

