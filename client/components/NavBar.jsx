import React from 'react';
import { Link } from 'react-router';
import NavTab from './NavTab';

const NavBar = () => (
  <nav className="navbar navbar-default navbar-static-top">
    <div className="container">
      <div className="navbar-header">
        <Link to="/"
              className="navbar-brand"
              style={{fontFamily: "'Satisfy', cursive", fontSize: "24px"}}
              activeStyle={{color: "#5e5e5e"}}>
          Travel Planner
        </Link>
      </div>
      <div id="navbar" className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <NavTab to="/travels">Travels</NavTab>
          <NavTab to="/users">Users</NavTab>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <NavTab to="/login">Login</NavTab>
          <NavTab to="/signup">Signup</NavTab>
        </ul>
      </div>
    </div>
  </nav>
);

export default NavBar;
