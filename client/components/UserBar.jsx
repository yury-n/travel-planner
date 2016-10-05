import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import NavTab from './NavTab';
import { getAuthentication } from '../reducers';
import { logout } from '../actions';

const UserBar = ({ authentication, logout }) => {
  const { authenticated, user } = authentication;

  return (
    <div className="user-bar">
      {(authenticated ? <UserBarLoggedin user={user} logout={logout} />
                      : <UserBarLoggedout />)}
    </div>
  );
};

const UserBarLoggedin = withRouter(({ user, logout, router }) => {
  const { name, role } = user;
  return (
    <ul className="nav navbar-nav navbar-right">
      <li><a href="javascript:void(0)"><strong>{name}</strong> ({role})</a></li>
      <li><a href="javascript:void(0)" onClick={() => {
          logout();
          router.push('/login');
        }}>Logout</a></li>
    </ul>
  );
});

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
  {logout}
)(UserBar);
