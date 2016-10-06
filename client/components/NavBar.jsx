import React from 'react';
import { Link } from 'react-router';
import NavTab from './NavTab';
import UserBar from './UserBar';
import Logo from './Logo';
import SectionsBar from './SectionsBar';

const NavBar = () => (
  <nav className="navbar navbar-default navbar-static-top">
    <div className="container">
      <div className="navbar-header">
        <Logo />
      </div>
      <div id="navbar" className="collapse navbar-collapse">
        <SectionsBar />
        <UserBar />
      </div>
    </div>
  </nav>
);

export default NavBar;
