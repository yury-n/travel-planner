import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openDeleteTravelModal } from '../../../actions';

class TravelsTable extends Component {

  getDaysTillStart(startDate) {
    startDate = new Date(startDate);
    if (startDate.getTime() < (new Date).getTime()) { // startDate in the past
      return '-';
    } else {
      const timeDiff = startDate.getTime() - (new Date).getTime();
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      return Math.ceil(timeDiff / _MS_PER_DAY);
    }
  }

  render() {
    const { travels } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Destination</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Days till start</th>
            <th>Comment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {travels.map((travel, index) => {
            return (
              <tr key={index}>
                <td><strong>{index + 1}</strong></td>
                <td>{travel.destination}</td>
                <td>{travel.startDate}</td>
                <td>{travel.endDate}</td>
                <td>{this.getDaysTillStart(travel.startDate)}</td>
                <td>{travel.comment}</td>
                <td className="text-right">
                  <button type="button"
                          className="btn btn-default">
                    Edit
                  </button>
                  {" "}
                  <button type="button"
                          className="btn btn-danger"
                          onClick={() => this.props.openDeleteTravelModal(travel._id, travel.destination)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default connect(
  null,
  {openDeleteTravelModal}
)(TravelsTable);
