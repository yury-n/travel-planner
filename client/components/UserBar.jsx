import React from 'react';
import { connect } from 'react-redux';
import NavTab from './NavTab';
import { getAuthentication } from '../reducers';

const UserBar = ({ authentication }) => {
  const { authenticated, user } = authentication;

  return (
    <div className="user-bar">
      {(authenticated ? <UserBarLoggedin user={user} />
                      : <UserBarLoggedout />)}
    </div>
  );
};

const UserBarLoggedin = ({ user }) => {
  const { name, role } = user;
  return (
    <ul className="nav navbar-nav navbar-right">
      <li>{name} ({role})</li>
      <NavTab to="/logout">Logout</NavTab>
    </ul>
  );
};

const UserBarLoggedout = () => {
  return (
    <ul className="nav navbar-nav navbar-right">
      <NavTab to="/login">Login</NavTab>
      <NavTab to="/signup">Signup</NavTab>
    </ul>
  );
}

const mapStateToProps = (state, params) => {
  return {
    authentication: getAuthentication(state)
  };
};

export default connect(
  mapStateToProps,
  {}
)(UserBar);
