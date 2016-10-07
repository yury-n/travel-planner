import {
  USERS_FETCHED,
  USERS_CREATE_SUCCESS,
  USERS_CREATE_FAILURE,
  USERS_OPEN_DELETE_MODAL,
  CLOSE_MODAL
} from '../actions';

const users = (state, action) => {

  if (typeof state == 'undefined') {
      return {
        errored: false,
        message: null,
        list: [],
        modal: null
      };
  }

  switch (action.type) {
    case USERS_FETCHED:
      return {
        ...state,
        list: action.users
      };
    case USERS_CREATE_SUCCESS:
      return {
        ...state,
        errored: false,
        message: action.message,
        list: [...state.list, action.user]
      };
    case USERS_CREATE_FAILURE:
      return {
        ...state,
        errored: true,
        message: action.message
      };
    case USERS_OPEN_DELETE_MODAL:
      return {
        ...state,
        modal: {
          type: 'delete',
          userid: action.userid,
          name: action.name
        }
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modal: null
      };
    default:
      return state;
  }
};

export default users;
