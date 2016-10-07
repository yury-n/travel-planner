import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions';

class Modal extends Component {
  render() {
    const { title, children, actionName } = this.props;

    return (
      <div className="modal fade in" role="dialog" id="myModal" style={{display: "block", background: "rgba(0, 0, 0, 0.3)"}}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.props.closeModal}><span>×</span></button>
              <h4 className="modal-title" id="myModalLabel">{title}</h4>
            </div>
            <div className="modal-body">
              {children}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" onClick={this.props.closeModal}>Close</button>
              <button type="button" className="btn btn-primary">{actionName}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {closeModal}
)(Modal);
