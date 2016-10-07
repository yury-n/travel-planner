import React from 'react';
import Modal from './Modal';

const UserDeleteModal = ({ userid, name }) => {
  return (
    <Modal title="Delete user" actionName="Delete">
      Are you sure you want to delete user <strong>{name}</strong>?
    </Modal>
  );
};

export default UserDeleteModal;
