import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '../../../Modal';
import { updateTravel } from '../../../../actions';

class EditTravelModal extends Component {

  constructor(props) {
    super(props);
    const { destination, startDate, endDate, comment } = props;
    this.state = {
      destination,
      startDate,
      endDate,
      comment
    };
  }

  render() {
    const { travelid, updateTravel } = this.props;
    const { destination, startDate, endDate, comment } = this.state;
    return (
      <Modal title="Edit travel" actionName="Update" action={() => updateTravel(
          travelid, destination, startDate, endDate, comment
        )}>
        <p>
          Edit travel attributes.
        </p>
        <table className="table">
          <tbody>
            <tr>
              <td><strong>Destination:</strong></td>
              <td><input onChange={(e) => this.setState({destination: e.target.value})} type="text" ref="destination" className="form-control" value={destination} /></td>
            </tr>
            <tr>
              <td><strong>Start Date:</strong></td>
              <td><input onChange={(e) => this.setState({startDate: e.target.value})} type="text" ref="startDate" className="form-control" value={startDate} /></td>
            </tr>
            <tr>
              <td><strong>End Date:</strong></td>
              <td><input onChange={(e) => this.setState({endDate: e.target.value})} type="text" ref="endDate" className="form-control" value={endDate} /></td>
            </tr>
            <tr>
              <td><strong>Comment:</strong></td>
              <td><input onChange={(e) => this.setState({comment: e.target.value})} type="text" ref="comment" className="form-control" value={comment} /></td>
            </tr>
          </tbody>
        </table>

      </Modal>
    );
  }
}

export default connect(
  null,
  {updateTravel}
)(EditTravelModal);
