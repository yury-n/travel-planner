import React, { Component } from 'react';

class UserButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dropdownShown: false,
      selectedUserid: null,
      selectedUsername: 'select user'
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    const { dropdownShown } = this.state;
    this.setState({dropdownShown: !dropdownShown});
  }

  selectUser(userid, username) {
    this.setState({
      dropdownShown: false,
      selectedUserid: userid,
      selectedUsername: username
    });
  }

  getSelectedUserid() {
    return this.state.selectedUserid;
  }

  render() {
    const { users } = this.props;
    const { dropdownShown, selectedUserid, selectedUsername } = this.state;
    return (
      <span style={{position: 'relative'}}>
        <button type="button"
                className="btn btn-default dropdown-toggle"
                style={{maxWidth: "130px", overflow: "hidden"}}
                onClick={this.toggleDropdown}>
          <span ref="role">{selectedUsername}</span> <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" style={{display: dropdownShown ? 'block' : 'none'}}>
          {users.map(user => <li key={user._id}>
                                <a onClick={() => this.selectUser(user._id, user.name)}
                                   href="javascript:void(0)">
                                   {user.name}
                                 </a>
                              </li>)}
        </ul>
      </span>
    );
  }
}

export default UserButton;
