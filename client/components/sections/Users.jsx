import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../reducers';
import { fetchUsers } from '../../actions';

class Users extends Component {

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { users } = this.props;

    return (
      <div className="container" style={{width: "520px"}}>
        <CreateUser />
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const buttonOptions = {};
              if (user.name == 'root') {
                buttonOptions['disabled'] = 'disabled';
              }
              return (
                <tr key={index}>
                  <td><strong>{index + 1}</strong></td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td className="text-right">
                    <button type="button" className="btn btn-default" {...buttonOptions}>Edit</button>
                    {" "}
                    <button type="button" className="btn btn-danger" {...buttonOptions}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

class CreateUser extends Component {
  render() {
    return (
      <div className="well clearfix">
        <form>
          <div className="input-group pull-left" style={{width: "378px"}}>
            <input type="text" className="form-control" />
            <RoleButton />
          </div>
          <button type="submit" className="btn btn-success pull-right">Create</button>
        </form>
      </div>
    );
  }
}

class RoleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {role: 'regular'};
    this.toggleRole = this.toggleRole.bind(this);
  }

  toggleRole() {
    const { role } = this.state;
    this.setState({role: role == 'regular' ? 'admin' : 'regular'});
  }

  render() {
    const { role } = this.state;
    return (
      <div className="input-group-btn">
        <button onClick={this.toggleRole} type="button" className="btn btn-default dropdown-toggle">{role} <span className="caret"></span></button>
      </div>
    )
  }
}

const mapStateToProps = (state, params) => {
  return {
    users: getUsers(state)
  };
};

export default connect(
  mapStateToProps,
  {fetchUsers}
)(Users);
