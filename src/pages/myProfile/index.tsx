import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/card';
import { RootState, AppDispatch } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserGists } from '../../slice/gistsSlice';
import './myProfile.scss';

const MyProfile = () => {
  const dispatch: AppDispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const userGists = useSelector((state: RootState) => state.gists.userGists);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchUserGists(userInfo.login));
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    console.log('user gists', userGists);
  }, [userGists]);

  if (!userInfo) {
    return <p>Please login to see your profile information!</p>;
  }

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
        <div className="user-gist-list">
          {userGists.map((gist) => (
            <Card key={gist.id} gist={gist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
