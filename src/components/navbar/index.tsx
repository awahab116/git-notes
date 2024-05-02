import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { ReactComponent as SearchLogo } from '../../assets/searchIcon.svg';
import MyButton from '../ui/button';
import './navbar.scss';

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-link">
        <img src={logo} alt="" />
      </Link>
      <div className="navbar-right">
        {' '}
        {/* Wrapper for right-aligned links */}
        <div className="navbar-link">
          {' '}
          <input
            className="nosubmit"
            type="search"
            placeholder="Search Notes..."
          />
        </div>
        <Link to="/login" className="navbar-link">
          <MyButton text="Login" />
        </Link>
      </div>
    </div>
  );
}
