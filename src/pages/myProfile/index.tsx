import { Link } from 'react-router-dom';
import Card from '../../components/card';
import { RootState, AppDispatch } from '../../app/store';
import { useSelector } from 'react-redux';
import './myProfile.scss';

const MyProfile = () => {
  const publicGists = useSelector(
    (state: RootState) => state.gists.publicGists
  );
  const numCards = 8;
  const first8Gists = publicGists.slice(0, numCards);

  return (
    <div className="my-profile-main-container">
      <div className="user-image-container">
        <img
          className="user-image"
          src="https://avatars.githubusercontent.com/u/1?v=4"
          alt=""
        />
        <Link to="/">
          <button className="github-profile-button" type="button">
            View Github profile
          </button>
        </Link>
      </div>
      <div className="user-gist-container">
        <h2>Your Gists</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {first8Gists.map((gist) => (
            <Card key={gist.id} gist={gist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
