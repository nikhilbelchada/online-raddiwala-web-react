import * as actionTypes from './actions/action_types';


export const user = (state = {users: [], user: {}, profile: {}}, action) => {
  switch ( action.type ) {
    case actionTypes.USER_DETAILS:
      return {...state, ...{users: action.users}};
    case actionTypes.USER_DETAIL:
      return {...state, ...{user: action.user}};
    case actionTypes.PROFILE_DETAIL:
      return {...state, ...{profile: action.profile}};
    default:
        return state;
  }
}
