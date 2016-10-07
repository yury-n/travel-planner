import {
  USERS_LOGIN_SUCCESS,
  USERS_LOGIN_FAILURE,
  USERS_LOGOUT,
  USERS_SIGNUP_SUCCESS
} from '../actions';

const authentication = (state, action) => {

  if (typeof state == 'undefined') {
    state = {
      authenticated: false,
      errored: false,
      message: '',
      user: null
    };
  }

  switch (action.type) {
    case USERS_LOGIN_SUCCESS:
    case USERS_SIGNUP_SUCCESS: {
      const { message, user, token } = action;
      return {
        authenticated: true,
        errored: false,
        message,
        user,
        token
      };
    }
    case USERS_LOGOUT: {
      return {
        authenticated: false,
        errored: false,
        message: null,
        user: null
      };
    }
    case USERS_LOGIN_FAILURE: {
      return {
        authenticated: false,
        errored: true,
        message: action.message,
        user: null
      };
    }
    default: {
      return state;
    }
  }

};

export default authentication;
