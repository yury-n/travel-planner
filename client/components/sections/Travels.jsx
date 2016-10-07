import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTravels } from '../../actions';
import { getTravels } from '../../reducers';
import CreateTravel from './Travels/CreateTravel';
import DeleteTravelModal from './Travels/modals/DeleteModal';
//import EditTravelModal from './Travels/modals/EditModal';
import Message from '../Message';
import TravelsTable from './Travels/TravelsTable';

class Travels extends Component {

  componentDidMount() {
    this.props.fetchTravels();
  }

  render() {
    const { message, errored, modal, list } = this.props;

    let messageComponent = null;
    if (message) {
      messageComponent = <Message message={message} errored={errored} />;
    }

    let modalComponent = null;
    if (modal) {
      if (modal.type == 'delete') {
        modalComponent = <DeleteTravelModal travelid={modal.travelid} destination={modal.destination} />;
      } else if (modal.type == 'edit') {
        //modalComponent = <EditUserModal userid={modal.userid} name={modal.name} role={modal.role} />;
      }
    }

    return (
      <div className="container" style={{width: "900px"}}>
        {messageComponent}
        <CreateTravel />
        <TravelsTable travels={list} />
        {modalComponent}
      </div>
    );

  }
}

const mapStateToProps = (state) => getTravels(state);

export default connect(
  mapStateToProps,
  {fetchTravels}
)(Travels);
