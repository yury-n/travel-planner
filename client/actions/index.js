import fetch from 'isomorphic-fetch';
import { getUsers, getAuthentication } from '../reducers';

export const USERS_LOGIN = 'USERS_LOGIN';
export const USERS_LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';
export const USERS_LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';
export const USERS_LOGOUT = 'USERS_LOGOUT';
export const USERS_SIGNUP = 'USERS_SIGNUP';
export const USERS_SIGNUP_SUCCESS = 'USERS_SIGNUP_SUCCESS';
export const USERS_SIGNUP_FAILURE = 'USERS_SIGNUP_FAILURE';
export const USERS_FETCHED = 'USERS_FETCHED';
export const USERS_CREATE_SUCCESS = 'USERS_CREATE_SUCCESS';
export const USERS_CREATE_FAILURE = 'USERS_CREATE_FAILURE';
export const USERS_OPEN_DELETE_MODAL = 'USERS_OPEN_DELETE_MODAL';
export const USERS_OPEN_EDIT_MODAL = 'USERS_OPEN_EDIT_MODAL';
export const USERS_DELETE_SUCCESS = 'USERS_DELETE_SUCCESS';
export const USERS_DELETE_FAILURE = 'USERS_DELETE_FAILURE';
export const USERS_UPDATE_SUCCESS = 'USERS_UPDATE_SUCCESS';
export const USERS_UPDATE_FAILURE = 'USERS_UPDATE_FAILURE';
export const TRAVELS_FETCHED = 'TRAVELS_FETCHED';
export const TRAVELS_CREATE_SUCCESS = 'TRAVELS_CREATE_SUCCESS';
export const TRAVELS_CREATE_FAILURE = 'TRAVELS_CREATE_FAILURE';
export const TRAVELS_OPEN_DELETE_MODAL = 'TRAVELS_OPEN_DELETE_MODAL';
export const TRAVELS_OPEN_EDIT_MODAL = 'TRAVELS_OPEN_EDIT_MODAL';
export const TRAVELS_DELETE_SUCCESS = 'TRAVELS_DELETE_SUCCESS';
export const TRAVELS_DELETE_FAILURE = 'TRAVELS_DELETE_FAILURE';
export const TRAVELS_UPDATE_SUCCESS = 'TRAVELS_UPDATE_SUCCESS';
export const TRAVELS_UPDATE_FAILURE = 'TRAVELS_UPDATE_FAILURE';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const CLOSE_MESSAGE = 'CLOSE_MESSAGE';

const parseResponse = (response) => {
  return response.json().then(data => ({
    status: response.status,
    data: data
  }));
};

const getWithJSONandAuth = (url, getState) => {
  const auth = getAuthentication(getState());
  if (auth.authenticated) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + 'authtoken=' + auth.authtoken;
  }
  return fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  });
};

const postWithJSONandAuth = (url, params, getState) => {
  const auth = getAuthentication(getState());
  params.authtoken = auth.authtoken;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
};;

const putWithJSONandAuth = (url, params, getState) => {
  const auth = getAuthentication(getState());
  if (auth.authenticated) {
    url += '?authtoken=' + auth.authtoken;
  }
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
};

const deleteWithJSONandAuth = (url, getState) => {
  const auth = getAuthentication(getState());
  if (auth.authenticated) {
    url += '?authtoken=' + auth.authtoken;
  }
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json'
    }
  });
};

export const closeModal = () => ({
  type: CLOSE_MODAL
});

export const closeMessage = () => ({
  type: CLOSE_MESSAGE
});

/*
USERS
*/

export const login = (name, password) => (dispatch, getState) => {
  dispatch({
    type: USERS_LOGIN
  });
  return postWithJSONandAuth('/api/users/authenticate', {name, password}, getState)
          .then(parseResponse).then(
            response => {
              if (response.status == 200) {
                dispatch({
                  type: USERS_LOGIN_SUCCESS,
                  message: response.data.message,
                  user: response.data.user,
                  authtoken: response.data.authtoken
                });
              } else {
                dispatch(loginFailure(response.data.message));
              }
            }
          );
};

export const loginFailure = (message) => ({
  type: USERS_LOGIN_FAILURE,
  message: message
});

export const logout = () => ({
  type: USERS_LOGOUT,
  message: ''
});

export const signup = (name, password) => (dispatch, getState) => {
  dispatch({
    type: USERS_SIGNUP
  });
  return postWithJSONandAuth('/api/users/', {name, password}, getState)
          .then(parseResponse).then(
            response => {
              if (response.status == 200) {
                dispatch({
                  type: USERS_SIGNUP_SUCCESS,
                  message: response.data.message,
                  user: response.data.user,
                  authtoken: response.data.authtoken
                });
              } else {
                dispatch(signupFailure(response.data.message));
              }
            }
          );
};

export const signupFailure = (message) => ({
  type: USERS_SIGNUP_FAILURE,
  message
});

export const fetchUsers = () => (dispatch) => {
  return fetch('/api/users/').then(parseResponse).then(
    response => {
      dispatch({
        type: USERS_FETCHED,
        users: response.data
      });
    }
  )
};

export const createUser = (name, password, role) => (dispatch, getState) => {
  return postWithJSONandAuth('/api/users/', {name, password, role}, getState)
    .then(parseResponse).then(
      response => {
        if (response.status == 200) {
          dispatch({
            type: USERS_CREATE_SUCCESS,
            user: response.data.user,
            message: 'User successfully created!'
          });
        } else {
          dispatch({
            type: USERS_CREATE_FAILURE,
            message: response.data.message
          });
        }
      }
    );
};

export const openDeleteUserModal = (userid, name) => ({
  type: USERS_OPEN_DELETE_MODAL,
  userid,
  name
});

export const deleteUser = (userid) => (dispatch, getState) => {
  dispatch({
    type: CLOSE_MODAL
  });
  return deleteWithJSONandAuth('/api/users/' + userid, getState)
          .then(parseResponse).then(
            response => {
              if (response.status == 200) {
                dispatch({
                  type: USERS_DELETE_SUCCESS,
                  message: response.data.message,
                  userid
                });
              }
            }
          );
};

export const openEditUserModal = (userid, name, role) => ({
  type: USERS_OPEN_EDIT_MODAL,
  userid,
  name,
  role
});

export const updateUser = (userid, password, role) => (dispatch, getState) => {
  dispatch({
    type: CLOSE_MODAL
  });
  return putWithJSONandAuth('/api/users/' + userid, {password, role}, getState)
          .then(parseResponse).then(
            response => {
              if (response.status == 200) {
                dispatch({
                  type: USERS_UPDATE_SUCCESS,
                  message: response.data.message,
                  userid,
                  role
                });
              }
            }
          );
};

/*
TRAVELS
*/

export const fetchTravels = (forAuthUser = false, fromDate, tillDate) => (dispatch, getState) => {
  let url;
  if (forAuthUser) {
    url = '/api/my/travels';
  } else {
    url = '/api/travels';
  }
  if (fromDate || tillDate) {
    url += '?1=1';
    if (fromDate) {
      url += '&fromDate=' + fromDate;
    }
    if (tillDate) {
      url += '&tillDate=' + tillDate;
    }
  }
  return getWithJSONandAuth(url, getState).then(parseResponse).then(
    response => {
      if (getUsers(getState()).list.length) {
        dispatch(travelsFetched(response));
      } else {
        dispatch(fetchUsers()).then(() => {
          dispatch(travelsFetched(response));
        })
      }
    }
  )
};

export const travelsFetched = (response) => ({
  type: TRAVELS_FETCHED,
  travels: response.data
});

export const createTravel = (forAuthUser, destination, startDate, endDate, comment, _userid) =>
                              (dispatch, getState) => {
  let url;
  if (forAuthUser) {
    url = '/api/my/travels';
  } else {
    url = '/api/travels';
  }
  return postWithJSONandAuth(
    url,
    {destination, startDate, endDate, comment, _userid},
    getState
  ).then(parseResponse).then(
    response => {
      if (response.status == 200) {
        dispatch({
          type: TRAVELS_CREATE_SUCCESS,
          travel: response.data.travel,
          message: 'Travel successfully created!'
        });
      } else {
        dispatch({
          type: TRAVELS_CREATE_FAILURE,
          message: response.data.message
        });
      }
    }
  )
};

export const openDeleteTravelModal = (travelid, destination) => ({
  type: TRAVELS_OPEN_DELETE_MODAL,
  travelid,
  destination
});

export const deleteTravel = (travelid) => (dispatch, getState) => {
  dispatch({
    type: CLOSE_MODAL
  });
  return deleteWithJSONandAuth('/api/travels/' + travelid, getState)
          .then(parseResponse).then(
            response => {
              if (response.status == 200) {
                dispatch({
                  type: TRAVELS_DELETE_SUCCESS,
                  message: response.data.message,
                  travelid
                });
              }
            }
          );
};

export const openEditTravelModal = (travelid, destination, startDate, endDate, comment) => ({
  type: TRAVELS_OPEN_EDIT_MODAL,
  travelid,
  destination,
  startDate,
  endDate,
  comment
});

export const updateTravel = (travelid, destination, startDate, endDate, comment) => (dispatch, getState) => {
  dispatch({
    type: CLOSE_MODAL
  });
  return putWithJSONandAuth('/api/travels/' + travelid, {destination, startDate, endDate, comment}, getState)
          .then(parseResponse).then(
            response => {
              if (response.status == 200) {
                dispatch({
                  type: TRAVELS_UPDATE_SUCCESS,
                  travelid,
                  message: response.data.message,
                  destination,
                  startDate,
                  endDate,
                  comment
                });
              } else {
                dispatch({
                  type: TRAVELS_UPDATE_FAILURE,
                  message: response.data.message
                });
              }
            }
          );
};
