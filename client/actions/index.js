import fetch from 'isomorphic-fetch';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_COMPLETED = 'USER_LOGIN_COMPLETED';

const parseJSON = (response) => {
    return response.json();
};

export const login = (name, password) => (dispatch) => {
    dispatch({
        type: USER_LOGIN
    });
    console.log(name);
    console.log(password);
    return fetch('/api/users').then(parseJSON).then(
        response => {
          console.log(response);
          dispatch({
              type: USER_LOGIN_COMPLETED,
              response
          });
        }
    ).catch(alert);
};
