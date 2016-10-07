import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../reducers';
import { fetchUsers } from '../../actions';
import CreateUser from './Users/CreateUser';
import UsersTable from './Users/UsersTable';
import DeleteUserModal from './Users/modals/DeleteModal';
import EditUserModal from './Users/modals/EditModal';
import Message from '../Message';

class Users extends Component {

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { message, errored, modal } = this.props;

    let messageComponent = null;
    if (message) {
      messageComponent = <Message message={message} errored={errored} />;
    }

    let modalComponent = null;
    if (modal) {
      if (modal.type == 'delete') {
        modalComponent = <DeleteUserModal userid={modal.userid} name={modal.name} />;
      } else if (modal.type == 'edit') {
        modalComponent = <EditUserModal userid={modal.userid} name={modal.name} role={modal.role} />;
      }
    }

    return (
      <div className="container" style={{width: "520px"}}>
        {messageComponent}
        <CreateUser />
        <UsersTable users={this.props.list} />
        {modalComponent}
      </div>
    );
  }
}

const mapStateToProps = (state, params) => getUsers(state);

export default connect(
  mapStateToProps,
  {fetchUsers}
)(Users);
