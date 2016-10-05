import { USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE } from '../actions';

const registration = (state, action) => {

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
      return {
        error: false,
        message
      };
  }

};

export default registration;
