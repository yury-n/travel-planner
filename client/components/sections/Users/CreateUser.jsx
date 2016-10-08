import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoleButton from './RoleButton';
import { createUser } from '../../../actions';

class CreateUser extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createUser(
      this.refs.inputName.value,
      this.refs.inputPassword.value,
      this.refs.roleButton.getSelectedRole()
    );
    this.refs.inputName.value = '';
    this.refs.inputPassword.value = '';
  }

  render() {
    return (
      <div className="well">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group pull-left" style={{width: "156px"}}>
            <input type="text" ref="inputName" className="form-control" placeholder="name" autoComplete="off" />
          </div>
          <div className="form-group pull-left" style={{width: "130px"}}>
            <input type="password" ref="inputPassword" className="form-control" placeholder="password" autoComplete="new-password" />
          </div>
          <RoleButton ref="roleButton" />
          <button type="submit" className="btn btn-success pull-right">Create</button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  {createUser}
)(CreateUser);
