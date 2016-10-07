import React, { Component } from 'react';

class RoleButton extends Component {

  constructor(props) {
    super(props);
    this.state = {selectedRole: props.selectedRole || 'regular'};
    this.toggleRole = this.toggleRole.bind(this);
  }

  toggleRole() {
    const { selectedRole } = this.state;
    this.setState({selectedRole: selectedRole == 'regular' ? 'admin' : 'regular'});
  }

  getSelectedRole() {
    return this.state.selectedRole;
  }

  render() {
    const { selectedRole } = this.state;
    return (
      <button onClick={this.toggleRole} type="button" className="btn btn-default dropdown-toggle"><span ref="role">{selectedRole}</span> <span className="caret"></span></button>
    )
  }
}

export default RoleButton;
