import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTravel } from '../../../actions';
import { getUsers } from '../../../reducers';
import UserButton from './UserButton';

class CreateTravel extends Component {

  handleSubmit(e) {
    e.preventDefault();

    const { forAuthUser } = this.props;

    this.props.createTravel(
      forAuthUser,
      this.refs.inputDestination.value,
      this.refs.inputStartDate.value,
      this.refs.inputEndDate.value,
      this.refs.inputComment.value,
      !forAuthUser ? this.refs.userButton.getSelectedUserid() : null
    );

    ['inputDestination', 'inputStartDate', 'inputEndDate', 'inputComment']
      .forEach(field => {this.refs[field].value = '';});

  }

  render() {
    const { users, forAuthUser } = this.props;

    return (
      <div className="well clearfix hidden-print">
        <form onSubmit={this.handleSubmit.bind(this)}>
          {!forAuthUser ? <UserButton ref="userButton" users={users} /> : null}
          <div className="form-group pull-left" style={{width: "146px"}}>
            <input type="text" ref="inputDestination" className="form-control" placeholder="destination" />
          </div>
          <div className="form-group pull-left" style={{width: "100px"}}>
            <input type="text" ref="inputStartDate" className="form-control" placeholder="start date" />
          </div>
          <div className="form-group pull-left" style={{width: "100px"}}>
            <input type="text" ref="inputEndDate" className="form-control" placeholder="end date" />
          </div>
          <div className="form-group pull-left" style={{width: "260px"}}>
            <input type="text" ref="inputComment" className="form-control" placeholder="comment" />
          </div>
          <button type="submit" className="btn btn-success pull-right">Create</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: getUsers(state).list
});

export default connect(
  mapStateToProps,
  {createTravel}
)(CreateTravel);
