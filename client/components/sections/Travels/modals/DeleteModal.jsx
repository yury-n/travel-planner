import React from 'react';
import { connect } from 'react-redux';
import Modal from '../../../Modal';
import { deleteTravel } from '../../../../actions';

const DeleteTravelModal = ({ forAuthUser, travelid, destination, deleteTravel }) => {
  return (
    <Modal title="Delete travel" actionName="Delete" action={() => deleteTravel(forAuthUser, travelid)}>
      Are you sure you want to delete this travel to <strong>{destination}</strong>?
    </Modal>
  );
};

export default connect(
  null,
  {deleteTravel}
)(DeleteTravelModal);
