import {
  TRAVELS_FETCHED,
  TRAVELS_CREATE_SUCCESS,
  TRAVELS_CREATE_FAILURE,
  TRAVELS_OPEN_DELETE_MODAL,
  TRAVELS_DELETE_SUCCESS,
  TRAVELS_OPEN_EDIT_MODAL,
  TRAVELS_UPDATE_SUCCESS,
  TRAVELS_UPDATE_FAILURE,
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
    case TRAVELS_CREATE_FAILURE:
    case TRAVELS_UPDATE_FAILURE:
      return {
        ...state,
        errored: true,
        message: action.message
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
    case TRAVELS_OPEN_EDIT_MODAL:
      return {
        ...state,
        modal: {
          type: 'edit',
          travelid: action.travelid,
          destination: action.destination,
          startDate: action.startDate,
          endDate: action.endDate,
          comment: action.comment
        }
      };
    case TRAVELS_UPDATE_SUCCESS:
      return {
        ...state,
        errored: false,
        message: action.message,
        list: state.list.map(travel => {
          if (travel._id == action.travelid) {
            return {
              ...travel,
              destination: action.destination || travel.destination,
              startDate: action.startDate || travel.startDate,
              endDate: action.endDate || travel.endDate,
              comment: action.comment || travel.comment
            };
          } else {
            return travel;
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

export default travels;
