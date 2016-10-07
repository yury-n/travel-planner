import React from 'react';
import { connect } from 'react-redux';
import Modal from '../../../Modal';
import { deleteUser } from '../../../../actions';

const UserDeleteModal = ({ userid, name, deleteUser }) => {
  return (
    <Modal title="Delete user" actionName="Delete" action={() => deleteUser(userid)}>
      Are you sure you want to delete user <strong>{name}</strong>?
    </Modal>
  );
};

export default connect(
  null,
  {deleteUser}
)(UserDeleteModal);
