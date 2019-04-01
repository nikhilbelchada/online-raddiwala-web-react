import * as actionTypes from './action_types';
import {Http} from '../../../utils/http';
import {API_URL} from '../urls';
import {displaySnackbar, startSpinner, stopSpinner} from '../../base/components';

export const authStart = () => {
    return { type: actionTypes.AUTH_START };
};

export const authSuccess = (token) => {
    return { type: actionTypes.AUTH_SUCCESS, token: token };
};

export const authFail = () => {
    return { type: actionTypes.AUTH_FAIL};
};

export const logout = () => {
    return { type: actionTypes.AUTH_LOGOUT};
};

/* Actions */
export const logoutAction = () => {
  return dispatch => {
    startSpinner();
    localStorage.clear();
    dispatch(logout());
    stopSpinner();
  };
}

export const loginAction = (username, password, history) => {
  return dispatch => {
    startSpinner();
    dispatch(authStart());
    const authData = { username: username, password: password };

    Http.post(API_URL.login(), authData, false)
      .then(response => {
        stopSpinner();
        localStorage.setItem('token', response.data.token);
        updateUserDetails(response.data.user_details);
        dispatch(authSuccess(response.data.token));
        history.push("/");
      })
      .catch(err => {
        stopSpinner();
        dispatch(authFail());
        displaySnackbar("Unable to login with provided credentials");
      });
  };
};

export const updateUserDetails = (userDetails) => {
  localStorage.setItem('username', userDetails.username);
  localStorage.setItem('user_id', userDetails.user_id);
  localStorage.setItem('first_name', userDetails.first_name || "");
  localStorage.setItem('last_name', userDetails.last_name || "");
  localStorage.setItem('phone', userDetails.phone || "");
  localStorage.setItem('admin', userDetails.admin || false);
  localStorage.setItem('address', userDetails.address || "");
  localStorage.setItem('email', userDetails.email || "");
}

export const getUserDetails = () => {
  return {
    id: localStorage.getItem("user_id"),
    username: localStorage.getItem("username"),
    first_name: localStorage.getItem("first_name"),
    last_name: localStorage.getItem("last_name"),
    phone: localStorage.getItem("phone"),
    admin: localStorage.getItem("admin"),
    address: localStorage.getItem("address"),
    email: localStorage.getItem("email"),
  }
}

export const isAdmin = () => {
  const userDetails = getUserDetails();
  return userDetails['admin'] === "true" || userDetails['admin'] === true;
}

export const autoLoginAction = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
    }
  };
};

export const registerAction = (data, history) => {
  return dispatch => {
    startSpinner();
    Http.post(API_URL.register(), data, false)
      .then(response => {
        stopSpinner();
        history.push("/login");
        displaySnackbar("Register successful, you can now login");
      })
      .catch(err => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      });
  };
};
