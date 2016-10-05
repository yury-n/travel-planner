import { combineReducers } from 'redux';
import authentication from './authentication';

const rootReducer = combineReducers({
  authentication
});

export default rootReducer;

export const getAuthentication = (state) => state.authentication;
