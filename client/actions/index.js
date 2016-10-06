import fetch from 'isomorphic-fetch';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE';
export const USERS_FETCHED = 'USERS_FETCHED';

const parseResponse = (response) => {
  return response.json().then(data => ({
    status: response.status,
    data: data
  }));
};

const postJSON = (url, params) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
};

export const login = (name, password) => (dispatch) => {
  dispatch({
    type: USER_LOGIN
  });
  return postJSON('/api/users/authenticate', {name, password})
          .then(parseResponse).then(
            response => {
              if (response.status == 200) {
                dispatch({
                  type: USER_LOGIN_SUCCESS,
                  message: response.data.message,
                  user: response.data.user,
                  token: response.data.token
                });
              } else {
                dispatch({
                  type: USER_LOGIN_FAILURE,
                  message: response.data.message
                });
              }
            }
          ).catch(alert);
};

export const logout = () => ({
  type: USER_LOGOUT,
  message: ''
});

export const signup = (name, password1, password2) => (dispatch) => {
  dispatch({
    type: USER_SIGNUP
  });
  return postJSON('/api/users/', {name, password1, password2})
          .then(parseResponse).then(
            response => {
              if (response.status == 200) {
                dispatch({
                  type: USER_SIGNUP_SUCCESS,
                  message: response.data.message,
                  user: response.data.user,
                  token: response.data.token
                });
              } else {
                dispatch({
                  type: USER_SIGNUP_FAILURE,
                  message: response.data.message
                });
              }
            }
          ).catch(alert);
};

export const fetchUsers = () => (dispatch) => {
  return fetch('/api/users/').then(parseResponse).then(
    response => {
      console.log(response.data);
      dispatch({
        type: USERS_FETCHED,
        users: response.data
      });
    }
  )
};
