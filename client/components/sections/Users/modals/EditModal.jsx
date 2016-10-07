import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoleButton from '../RoleButton';
import Modal from '../../../Modal';
import { updateUser } from '../../../../actions';

class EditUserModal extends Component {
  render() {
    const { userid, name, role, updateUser } = this.props;
    return (
      <Modal title="Edit user" actionName="Update" action={() => updateUser(
          userid,
          this.refs.inputPassword.value,
          this.refs.roleButton.getSelectedRole()
        )}>
        <p>
          Change attributes for user <strong>{name}</strong>.
        </p>
        <table className="table">
          <tbody>
            <tr>
              <td><strong>Password:</strong></td>
              <td><input type="text" ref="inputPassword" className="form-control" placeholder="password" autoComplete="new-password" /></td>
            </tr>
            <tr>
              <td><strong>Role: </strong></td>
              <td><RoleButton selectedRole={role} ref="roleButton" /></td>
            </tr>
          </tbody>
        </table>

      </Modal>
    );
  }
}

export default connect(
  null,
  {updateUser}
)(EditUserModal);
