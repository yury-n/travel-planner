import React from 'react';
import { connect } from 'react-redux';
import { closeMessage } from '../actions';

const Message = ({ message, errored, closeMessage }) => {
  return (
    <div className={"alert alert-" + (errored ? "warning" : "success")}>
      {message}
      <button type="button"
              className="close"
              onClick={closeMessage}>
        <span>&times;</span>
      </button>
    </div>
  );
};

export default connect(
  null,
  {closeMessage}
)(Message);
