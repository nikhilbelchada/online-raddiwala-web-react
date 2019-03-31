import * as actionTypes from './actions/action_types';


export const order = (state = {orders: [], order: {}}, action) => {
  switch ( action.type ) {
    case actionTypes.ORDER_DETAIL:
      return {...state, ...{order: action.order}};
    case actionTypes.ORDER_DETAILS:
      return {...state, ...{orders: action.orders}};
    default:
        return state;
  }
}
