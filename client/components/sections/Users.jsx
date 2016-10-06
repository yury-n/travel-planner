import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../reducers';
import { fetchUsers } from '../../actions';
import CreateUser from './Users/CreateUser';
import UsersTable from './Users/UsersTable';

class Users extends Component {

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    let message = null;
    if (this.props.message) {
      message = (<div className={"alert alert-" + (this.props.error ? "warning" : "success")}>
        {this.props.message}
      </div>);
    }
    return (
      <div className="container" style={{width: "520px"}}>
        {message}
        <CreateUser />
        <UsersTable users={this.props.list} />
      </div>
    );
  }
}

const mapStateToProps = (state, params) => {
  return {
    ...getUsers(state)
  };
};

export default connect(
  mapStateToProps,
  {fetchUsers}
)(Users);
