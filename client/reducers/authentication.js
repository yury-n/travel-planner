import { USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGOUT } from '../actions';

const authentication = (state, action) => {

  switch (action.type) {
    case USER_LOGIN_SUCCESS: {
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
      return {
        authenticated: false,
        message: '',
        user: null
      };
  }

};

export default authentication;
