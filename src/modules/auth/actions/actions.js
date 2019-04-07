import * as actionTypes from './action_types';
import {Http} from '../../../utils/http';
import {API_URL} from '../urls';
import {displaySnackbar, startSpinner, stopSpinner} from '../../base/components';
import * as homeActionTypes from '../../home/actions/action_types';
import {getProfileAction} from '../../home/actions/actions';

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
        localStorage.setItem('user_id', response.data.user_details.id);
        dispatch(authSuccess(response.data.token));
        dispatch({
          type: homeActionTypes.PROFILE_DETAIL,
          profile: response.data.user_details,
        })
        history.push("/");
      })
      .catch(err => {
        stopSpinner();
        dispatch(authFail());
        displaySnackbar("Unable to login with provided credentials");
      });
  };
};

export const autoLoginAction = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');
    if (!token || !user_id) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
      dispatch(getProfileAction(user_id));
    }
  };
};

export const registerAction = (data, history) => {
  return dispatch => {
    startSpinner();
    Http.post(API_URL.register(), data, false)
      .then(response => {
        stopSpinner();
        displaySnackbar("Register successful, you can now login");
        history.push("/login");
      })
      .catch(err => {
        stopSpinner();
        displaySnackbar("Something went wrong");
      });
  };
};
