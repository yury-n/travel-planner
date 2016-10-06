import React, { Component } from 'react';

class UsersTable extends Component {
  render() {
    const { users } = this.props;
    return (
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
    );
  }
}

export default UsersTable;
