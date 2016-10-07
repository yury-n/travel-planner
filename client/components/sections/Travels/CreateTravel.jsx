import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTravel } from '../../../actions';
import { getUsers } from '../../../reducers';
import UserButton from './UserButton';

class CreateTravel extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createTravel(
      this.refs.inputDestination.value,
      this.refs.inputStartDate.value,
      this.refs.inputEndDate.value,
      this.refs.inputComment.value,
      this.refs.userButton.getSelectedUserid()
    );
    ['inputDestination', 'inputStartDate', 'inputEndDate', 'inputComment']
      .forEach(field => {this.refs[field].value = '';});

  }

  render() {
    const { users } = this.props;

    return (
      <div className="well">
        <form onSubmit={this.handleSubmit}>
          <UserButton ref="userButton" users={users} />
          <div className="form-group pull-left" style={{width: "146px", marginRight: "4px"}}>
            <input type="text" ref="inputDestination" className="form-control" placeholder="destination" />
          </div>
          <div className="form-group pull-left" style={{width: "100px", marginRight: "4px"}}>
            <input type="text" ref="inputStartDate" className="form-control" placeholder="start date" />
          </div>
          <div className="form-group pull-left" style={{width: "100px", marginRight: "4px"}}>
            <input type="text" ref="inputEndDate" className="form-control" placeholder="end date" />
          </div>
          <div className="form-group pull-left" style={{width: "260px", marginRight: "4px"}}>
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
