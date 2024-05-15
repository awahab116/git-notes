//DropdownMenu.js
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
          <Link
            to={`https://gist.github.com/${userInfo?.login}`}
            target="blank"
          >
            Your Gists
          </Link>
        </li>
        <li className="dropdownItem">
          <Link
            to={`https://gist.github.com/${userInfo?.login}/starred`}
            target="blank"
          >
            Starred Gists
          </Link>
        </li>
        <li className="dropdownItem">
          <Link to="/create-gist"> Create Gist </Link>
        </li>
        <li className="dropdownItem">
          <Link
            to={userInfo?.html_url ? userInfo?.html_url : 'https://github.com'}
            target="blank"
          >
            Your Github profile
          </Link>
        </li>
        <li className="dropdownItem">
          <Link to="https://support.github.com/" target="blank">
            Help
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
