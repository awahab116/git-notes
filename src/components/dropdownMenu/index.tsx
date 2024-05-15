// DropdownMenu.js
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../app/store';
import './DropdownMenu.scss';

function DropdownMenu({ isOpen }: { isOpen: boolean }) {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return (
    <div className={`dropdown-menu ${isOpen ? 'active' : 'inactive'}`}>
      <Link to="/my-profile">
        <p>
          Signed in as <br />
          {userInfo?.login}
        </p>
      </Link>
      <ul>
        <li className="dropdownItem">
          <Link to="https://www.google.com/"> Your Gists </Link>
        </li>
        <li className="dropdownItem">
          <Link to="https://www.google.com/"> Starred Gists </Link>
        </li>
        <li className="dropdownItem">
          <Link to="/create-gist"> Create Gist </Link>
        </li>
        <li className="dropdownItem">
          <Link to="https://www.google.com/"> Help </Link>
        </li>
        <li className="dropdownItem">
          <Link
            to={
              userInfo?.html_url
                ? userInfo?.html_url
                : 'https://www.github.com/'
            }
          >
            Your Github profile
          </Link>
        </li>
        <li className="dropdownItem">
          <Link to=""> Signout </Link>
        </li>
      </ul>
    </div>
  );
}

export default DropdownMenu;
