import React, { Component } from 'react';

class Modal extends Component {
  render() {
    const style = {
      display: "block",
      background: "rgba(0, 0, 0, 0.3)"
    };
    return (
      <div className="modal fade in" role="dialog" id="myModal" style={style}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 className="modal-title" id="myModalLabel">Modal title</h4>
            </div>
            <div className="modal-body">
              <h4>Text in a modal</h4>
              <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
              <h4>Popover in a modal</h4>
              <p>This <a href="#" className="btn btn-default popover-test" role="button" title="" data-content="And here's some amazing content. It's very engaging. right?" data-original-title="A Title">button</a> should trigger a popover on click.</p>
              <h4>Tooltips in a modal</h4>
              <p><a href="#" className="tooltip-test" title="" data-original-title="Tooltip">This link</a> and <a href="#" className="tooltip-test" title="" data-original-title="Tooltip">that link</a> should have tooltips on hover.</p>
              <hr/>
              <h4>Overflowing text to show scroll behavior</h4>
            </div>
            <div className="modal-footer"> <button type="button" className="btn btn-default" data-dismiss="modal">Close</button> <button type="button" className="btn btn-primary">Save changes</button> </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;
