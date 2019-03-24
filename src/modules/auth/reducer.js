import * as actionTypes from './actions/action_types';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

export const authStatus = (state = initialState, action) => {
  switch ( action.type ) {
    case actionTypes.AUTH_START:
      return {...state, ...{error: null, loading: true}}
    case actionTypes.AUTH_SUCCESS:
      return {...state, ...{error: null, loading: false, token: action.token}};
    case actionTypes.AUTH_FAIL:
      return {...state, ...{error: action.error, loading: false}};
    case actionTypes.AUTH_LOGOUT:
      return {...state, ...{error: null, loading: false, token: null}};
    default:
        return state;
  }
}
