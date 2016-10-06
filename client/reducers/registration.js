import { USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE } from '../actions';

const registration = (state, action) => {

  if (typeof state == 'undefined') {
    return {
      error: false,
      message: null
    };
  }

  switch (action.type) {
    case USER_SIGNUP_SUCCESS: {
      const { message } = action;
      return {
        error: false,
        message
      };
    }
    case USER_SIGNUP_FAILURE: {
      const { message } = action;
      return {
        error: true,
        message
      };
    }
    default:
      return state;
  }

};

export default registration;
