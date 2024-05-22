//DropdownMenu.js
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../app/store';
import { githubUserLogout } from '../../slice/authSlice';
import './DropdownMenu.scss';

function DropdownMenu({ isOpen }: { isOpen: boolean }) {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = () => {
    dispatch(githubUserLogout());
    navigate('/');
  };

  return (
    <div className={`dropdown-menu ${isOpen ? 'active' : 'inactive'}`}>
      <Link to={`/my-profile/${userInfo?.login}`}>
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
        <li className="dropdownItem" onClick={handleSignout}>
          <Link to=""> Signout </Link>
        </li>
      </ul>
    </div>
  );
}

export default DropdownMenu;
