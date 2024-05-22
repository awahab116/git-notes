import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import Card from '../../components/card';
import { getUserGists, githubUserDetails } from '../../api/gistsApi';
import { fetchUserGists } from '../../slice/gistsSlice';
import { Gist } from '../../types/gists.type';
import { User } from '../../slice/authSlice';
import './myProfile.scss';

const MyProfile = () => {
  const [gists, setGists] = useState<Gist[] | null>();
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const { username } = useParams();

  const userInfoAndGists = async (name: string) => {
    const userGistsRes = await getUserGists(name);
    const userDetailsRes = await githubUserDetails(name);
    console.log('user gists', userGistsRes);
    setUserDetails(userDetailsRes);
    setGists(userGistsRes);
  };

  useEffect(() => {
    if (username) {
      userInfoAndGists(username);
    }
  }, [username]);

  if (!username) {
    return <p>Please login to see your profile information!</p>;
  }

  return (
    <div className="my-profile-main-container">
      <div className="user-image-container">
        <img className="user-image" src={userDetails?.avatar_url} alt="" />
        <Link
          to={
            userDetails?.html_url ? userDetails?.html_url : 'https://github.com'
          }
        >
          <button className="github-profile-button" type="button">
            View Github profile
          </button>
        </Link>
      </div>
      <div className="user-gist-container">
        <h2>Your Gists</h2>
        <div className="user-gist-list">
          {gists && gists.map((gist) => <Card key={gist.id} gist={gist} />)}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
