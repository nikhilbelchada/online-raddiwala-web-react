import * as actionTypes from './action_types';
import {Http} from '../../../utils/http';
import {API_URL} from '../urls';

export const authStart = () => {
    return { type: actionTypes.AUTH_START };
};

export const authSuccess = (token) => {
    return { type: actionTypes.AUTH_SUCCESS, token: token };
};

export const authFail = (error) => {
    return { type: actionTypes.AUTH_FAIL, error: error };
};

export const logout = () => {
    return { type: actionTypes.AUTH_LOGOUT};
};

/* Actions */
export const logoutAction = () => {
  return dispatch => {
    localStorage.removeItem('token');
    dispatch(logout());
  };
}

export const loginAction = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = { username: username, password: password };

    Http.post(API_URL.login(), authData)
      .then(response => {
        localStorage.setItem('token', response.data.token);
        dispatch(authSuccess(response.data.token));
      })
      .catch(err => {
        dispatch(authFail("Unable to login using provided credentials"));
      });
  };
};

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
