import * as actionTypes from './actions/action_types';


export const wasteCategory = (state = {waste_categories: [], waste_category: {}}, action) => {
  switch ( action.type ) {
    case actionTypes.WASTE_CATEGORY_DETAILS:
      return {...state, ...{waste_categories: action.waste_categories}};
    case actionTypes.WASTE_CATEGORY_DETAIL:
      return {...state, ...{waste_category: action.waste_category}};
    default:
        return state;
  }
}

export const waste = (state = {waste: {}, wastes: []}, action) => {
  switch ( action.type ) {
    case actionTypes.WASTE_DETAILS:
      return {...state, ...{wastes: action.wastes}};
    case actionTypes.WASTE_DETAIL:
      return {...state, ...{waste: action.waste}};
    default:
        return state;
  }
}
