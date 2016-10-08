import {
  USERS_FETCHED,
  USERS_CREATE_SUCCESS,
  USERS_CREATE_FAILURE,
  USERS_OPEN_DELETE_MODAL,
  USERS_DELETE_SUCCESS,
  USERS_OPEN_EDIT_MODAL,
  USERS_UPDATE_SUCCESS,
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
    case USERS_DELETE_SUCCESS:
      return {
        ...state,
        errored: false,
        message: action.message,
        list: state.list.filter(user => user._id != action.userid)
      };
    case USERS_OPEN_EDIT_MODAL:
      return {
        ...state,
        modal: {
          type: 'edit',
          userid: action.userid,
          name: action.name,
          role: action.role
        }
      };
    case USERS_UPDATE_SUCCESS:
      return {
        ...state,
        errored: false,
        message: action.message,
        list: state.list.map(user => {
          if (user._id == action.userid) {
            return {
              ...user,
              role: action.role
            };
          } else {
            return user;
          }
        })
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

export const getUserById = (state, userid) => {
  return state.list.find(user => user._id == userid);
};
