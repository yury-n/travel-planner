import { combineReducers } from 'redux';
import authentication from './authentication';
import registration from './registration';

const rootReducer = combineReducers({
  authentication,
  registration
});

export default rootReducer;

export const getAuthentication = (state) => state.authentication;
export const getRegistration = (state) => state.registration;
