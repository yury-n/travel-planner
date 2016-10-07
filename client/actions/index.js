import fetch from 'isomorphic-fetch';

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
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const USERS_DELETE_SUCCESS = 'USERS_DELETE_SUCCESS';
export const USERS_DELETE_FAILURE = 'USERS_DELETE_FAILURE';
export const USERS_UPDATE_SUCCESS = 'USERS_UPDATE_SUCCESS';
export const USERS_UPDATE_FAILURE = 'USERS_UPDATE_FAILURE';

const parseResponse = (response) => {
  return response.json().then(data => ({
    status: response.status,
    data: data
  }));
};

const fetchWithJSON = (method) => {
  return (url, params) => {
      return fetch(url, {
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });
  };
}
const postWithJSON = fetchWithJSON('POST');
const putWithJSON = fetchWithJSON('PUT');
const deleteWithJSON = fetchWithJSON('DELETE');

export const login = (name, password) => (dispatch) => {
  dispatch({
    type: USERS_LOGIN
  });
  return postWithJSON('/api/users/authenticate', {name, password})
          .then(parseResponse).then(
            response => {
              if (response.status == 200) {
                dispatch({
                  type: USERS_LOGIN_SUCCESS,
                  message: response.data.message,
                  user: response.data.user,
                  token: response.data.token
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

export const signup = (name, password) => (dispatch) => {
  dispatch({
    type: USERS_SIGNUP
  });
  return postWithJSON('/api/users/', {name, password})
          .then(parseResponse).then(
            response => {
              if (response.status == 200) {
                dispatch({
                  type: USERS_SIGNUP_SUCCESS,
                  message: response.data.message,
                  user: response.data.user,
                  token: response.data.token
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

export const createUser = (name, password, role) => (dispatch) => {
  return postWithJSON('/api/users/', {name, password, role}).then(parseResponse).then(
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
  )
};

export const closeModal = () => ({
  type: CLOSE_MODAL
});

export const openUserDeleteModal = (userid, name) => ({
  type: USERS_OPEN_DELETE_MODAL,
  userid,
  name
});

export const deleteUser = (userid) => (dispatch) => {
  dispatch({
    type: CLOSE_MODAL
  });
  return deleteWithJSON('/api/users/' + userid, {})
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

export const openUserEditModal = (userid, name, role) => ({
  type: USERS_OPEN_EDIT_MODAL,
  userid,
  name,
  role
});

export const updateUser = (userid, password, role) => (dispatch) => {
  dispatch({
    type: CLOSE_MODAL
  });
  return putWithJSON('/api/users/' + userid, {password, role})
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
