import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import DropdownMenu from '../dropdownMenu';
import MyButton from '../ui/button';
import { loginUser, githubUserDataLoaded } from '../../slice/authSlice';
import logo from '../../assets/logo.svg';
import './navbar.scss';
import { searchGists } from 'src/slice/gistsSlice';
import _debounce from 'lodash/debounce';

const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=user,gist`;

export default function Navbar() {
  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchGist, setSearchGist] = useState('');

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

  useEffect(() => {
    console.log('searchGist ', searchGist);
    const debouncedSearch = _debounce((value: string) => {
      dispatch(searchGists(value));
    }, 3000);

    debouncedSearch(searchGist);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchGist, dispatch]);

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
        <div className="navbar-link">
          <input
            className="nosubmit"
            type="search"
            placeholder="Search Notes..."
            onChange={(e) => setSearchGist(e.target.value)}
          />
        </div>
        {isUserloggedIn && userInfo ? (
          <div onClick={toggleDropdown}>
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
