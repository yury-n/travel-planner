import {
  USERS_FETCHED,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAILURE
} from '../actions';

const users = (state, action) => {

  if (typeof state == 'undefined') {
      return {
        error: false,
        message: null,
        list: []
      };
  }

  switch (action.type) {
    case USERS_FETCHED:
      return {
        ...state,
        list: action.users
      };
    case USER_CREATE_SUCCESS:
      return {
        ...state,
        error: false,
        message: action.message,
        list: [...state.list, action.user]
      };
    case USER_CREATE_FAILURE:
        return {
          ...state,
          error: true,
          message: action.message
        };
    default:
      return state;
  }
};

export default users;
