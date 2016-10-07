import { USERS_SIGNUP_SUCCESS, USERS_SIGNUP_FAILURE } from '../actions';

const registration = (state, action) => {

  if (typeof state == 'undefined') {
    return {
      errored: false,
      message: null
    };
  }

  switch (action.type) {
    case USERS_SIGNUP_SUCCESS: {
      const { message } = action;
      return {
        errored: false,
        message
      };
    }
    case USERS_SIGNUP_FAILURE: {
      const { message } = action;
      return {
        errored: true,
        message
      };
    }
    default:
      return state;
  }

};

export default registration;
