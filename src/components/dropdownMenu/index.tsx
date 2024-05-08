// DropdownMenu.js
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import './DropdownMenu.scss';

function DropdownItem({ text, itemURL }: { text: string; itemURL: string }) {
  return (
    <li className="dropdownItem">
      {/* <img src={props.img}></img> */}
      <a href={itemURL}> {text} </a>
    </li>
  );
}

function DropdownMenu({ isOpen }: { isOpen: boolean }) {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return (
    <div className={`dropdown-menu ${isOpen ? 'active' : 'inactive'}`}>
      <p>
        Signed in as <br />
        {userInfo?.login}
      </p>
      <ul>
        <li className="dropdownItem">
          <a href={'https://www.google.com/'}> Your Gists </a>
        </li>
        <li className="dropdownItem">
          <a href={'https://www.google.com/'}> Starred Gists </a>
        </li>
        <li className="dropdownItem">
          <a href={'https://www.google.com/'}> Help </a>
        </li>
        <li className="dropdownItem">
          <a
            href={
              userInfo?.html_url
                ? userInfo?.html_url
                : 'https://www.github.com/'
            }
          >
            Your Github profile
          </a>
        </li>
        <li className="dropdownItem">
          <a href={'https://www.google.com/'}> Signout </a>
        </li>
      </ul>
    </div>
  );
}

export default DropdownMenu;
