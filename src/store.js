import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import * as reducers from './reducer';

const composeEnhancers = process.env.NODE_ENV === 'development' ? (
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose) : null || compose;

const rootReducer = combineReducers({
  ...reducers
});

export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));
