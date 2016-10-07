import {
  TRAVELS_FETCHED,
  TRAVELS_CREATE_SUCCESS,
  TRAVELS_CREATE_FAILURE,
  TRAVELS_OPEN_DELETE_MODAL,
  TRAVELS_DELETE_SUCCESS,
  CLOSE_MODAL
} from '../actions';

const travels = (state, action) => {

  if (typeof state == 'undefined') {
      return {
        errored: false,
        message: null,
        list: [],
        modal: null
      };
  }

  switch (action.type) {
    case TRAVELS_FETCHED:
      return {
        ...state,
        list: action.travels
      };
    case TRAVELS_CREATE_SUCCESS:
      return {
        ...state,
        errored: false,
        message: action.message,
        list: [...state.list, action.travel]
      };
    case TRAVELS_OPEN_DELETE_MODAL:
      return {
        ...state,
        modal: {
          type: 'delete',
          travelid: action.travelid,
          destination: action.destination
        }
      };
    case TRAVELS_DELETE_SUCCESS:
      return {
        ...state,
        errored: false,
        message: action.message,
        list: state.list.filter(travel => travel._id != action.travelid)
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

export default travels;
