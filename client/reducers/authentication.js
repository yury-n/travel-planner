const authentication = (state, action) => {

  return {
    authenticated: false,
    message: '',
    user: null
  };
};

export default authentication;
