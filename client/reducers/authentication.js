import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
  USER_SIGNUP_SUCCESS
} from '../actions';

const authentication = (state, action) => {

  if (typeof state == 'undefined') {
    state = {
      authenticated: false,
      message: '',
      user: null
    };
  }

  switch (action.type) {
    case USER_LOGIN_SUCCESS:
    case USER_SIGNUP_SUCCESS: {
      const { message, user, token } = action;
      return {
        authenticated: true,
        message,
        user,
        token
      };
    }
    case USER_LOGOUT:
    case USER_LOGIN_FAILURE: {
      const { message } = action;
      return {
        authenticated: false,
        message: message,
        user: null
      };
    }
    default:
      return state;
  }

};

export default authentication;
