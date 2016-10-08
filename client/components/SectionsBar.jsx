import React from 'react';
import { connect } from 'react-redux';
import { getAuthentication } from '../reducers';
import NavTab from './NavTab';

const SectionsBar = ({ authentication }) => {

  if (authentication.authenticated) {
    switch (authentication.user.role) {
      case 'admin':
        return (
          <ul className="nav navbar-nav">
            <NavTab to="/users">Users</NavTab>
            <NavTab to="/my/travels">My Travels</NavTab>
          </ul>
        );
      case 'superadmin':
        return (
          <ul className="nav navbar-nav">
            <NavTab to="/users">Users</NavTab>
            <NavTab to="/my/travels">My Travels</NavTab>
            <NavTab to="/travels">All Travels</NavTab>
          </ul>
        );
      default:
      case 'regular':
        return (
          <ul className="nav navbar-nav">
            <NavTab to="/my/travels">My Travels</NavTab>
          </ul>
        );
    }
  } else {
    return (
      <ul className="nav navbar-nav"></ul>
    );
  }
};

const mapStateToProps = (state, params) => {
  return {
    authentication: getAuthentication(state)
  };
};

export default connect(
  mapStateToProps,
  {}
)(SectionsBar);
