import { combineReducers } from 'redux';
import authentication from './authentication';
import registration from './registration';
import users from './users';
import modal from './modal';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  modal
});

export default rootReducer;

export const getAuthentication = (state) => state.authentication;
export const getRegistration = (state) => state.registration;
export const getUsers = (state) => state.users;
