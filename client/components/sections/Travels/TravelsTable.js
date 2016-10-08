import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openDeleteTravelModal, openEditTravelModal } from '../../../actions';
import { getUsers, getTravels } from '../../../reducers';
import { getUserById } from '../../../reducers/users';

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
            <th>User</th>
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
                <td>{travel.username}</td>
                <td>{travel.destination}</td>
                <td>{travel.startDate}</td>
                <td>{travel.endDate}</td>
                <td>{this.getDaysTillStart(travel.startDate)}</td>
                <td>{travel.comment}</td>
                <td className="text-right">
                  <button type="button"
                          className="btn btn-default"
                          onClick={() => this.props.openEditTravelModal(travel._id, travel.destination, travel.startDate, travel.endDate, travel.comment)}>
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

const mapStateToProp = (state) => {
  const users = getUsers(state);
  const travels = getTravels(state);
  return {
    travels: travels.list.map(travel => {
      return {...travel, username: getUserById(users, travel._userid).name};
    })
  }
};

export default connect(
  mapStateToProp,
  {openDeleteTravelModal, openEditTravelModal}
)(TravelsTable);
