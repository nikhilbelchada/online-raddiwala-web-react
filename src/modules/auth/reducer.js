import * as actionTypes from './actions/action_types';

const initialState = {
  token: undefined,
  userDetails: {},
  userId: null,
  authRedirectPath: '/'
};

export const authStatus = (state = initialState, action) => {
  switch ( action.type ) {
    case actionTypes.AUTH_START:
      return {...state, ...{}}
    case actionTypes.AUTH_SUCCESS:
      return {...state, ...{token: action.token, details: action.user_details}};
    case actionTypes.AUTH_FAIL:
      return {...state, ...{loading: false}};
    case actionTypes.AUTH_LOGOUT:
      return {...state, ...{token: null, user_details: {}}};
    default:
        return state;
  }
}
