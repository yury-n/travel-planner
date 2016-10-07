const modal = (state, action) => {

  if (typeof state == 'undefined') {
    state = {
      hidden: true,
      title: null
    };
  }

  switch (action.type) {
    default:
      return state;
  }
};

export default modal;
