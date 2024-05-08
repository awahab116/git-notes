import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import MyButton from '../ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { loginUser } from '../../slice/authSlice';
import DropdownMenu from '../dropdownMenu';
import './navbar.scss';

const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=user`;

export default function Navbar() {
  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const isUserloggedIn = useSelector(
    (state: RootState) => state.auth.isUserLoggedIn
  );
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    console.log('Navbar mounted ss ', process.env.REACT_APP_GITHUB_CLIENT_ID);
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      console.log('OAuth code received: ', code);
      dispatch(loginUser(code));
    }
  }, []);

  const toggleDropdown = () => {
    console.log('toggleDropdown');
    setIsOpen(!isOpen);
  };

  console.log('userinfo avatar url', userInfo?.avatar_url);

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
        {isUserloggedIn && userInfo ? (
          <div onClick={toggleDropdown}>
            {/* img tag to show user img */}
            <img className="navbar-avatar" src={userInfo.avatar_url} alt="" />
            <DropdownMenu isOpen={isOpen} />
          </div>
        ) : (
          <div>
            <Link to={githubOAuthURL} className="navbar-link">
              <MyButton text="Login" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
