import React, { Component } from 'react';

class RoleButton extends Component {
  
  constructor(props) {
    super(props);
    this.state = {role: props.role || 'regular'};
    this.toggleRole = this.toggleRole.bind(this);
  }

  toggleRole() {
    const { role } = this.state;
    this.setState({role: role == 'regular' ? 'admin' : 'regular'});
  }

  getRole() {
    const { role } = this.state;
    return role;
  }

  render() {
    const { role } = this.state;
    return (
      <button onClick={this.toggleRole} type="button" className="btn btn-default dropdown-toggle"><span ref="role">{role}</span> <span className="caret"></span></button>
    )
  }
}

export default RoleButton;
