import React from 'react';
import { Link } from 'react-router';

const Logo = () => (
  <Link to="/"
        className="navbar-brand"
        style={{fontFamily: "'Satisfy', cursive", fontSize: "24px", color: "#5e5e5e"}}>
    Travel Planner
  </Link>
);

export default Logo;
