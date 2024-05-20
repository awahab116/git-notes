import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { githubUserDataLoaded } from '../../slice/authSlice';
import GistsGrid from '../../components/gistsGrid';
import GistsTable from '../../components/gistsTable';
import { getGists } from '../../slice/gistsSlice';
import GridIcon from '../../assets/gridIcon.svg';
import ListIcon from '../../assets/listIcon.svg';
import './home.scss';

const Home: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const userDataLoading = useSelector(
    (state: RootState) => state.auth.userDataLoaded
  );
  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      console.log('OAuth code received: ', code);
      dispatch(githubUserDataLoaded(true));
    }
  }, []);

  useEffect(() => {
    console.log('in home dispatch');
    dispatch(getGists());
  }, [dispatch, userInfo]);

  const toggleView = () => {
    setIsGridView((prevState) => !prevState);
  };

  useEffect(() => {
    console.log('user data loaded ', userDataLoading);
  }, [userDataLoading]);

  return (
    <div className="home-container">
      {userInfo && !userDataLoading ? (
        <>
          <div className="gists-view">
            <h2>Public Gists</h2>
            <div>
              <img
                src={GridIcon}
                alt="Grid View"
                onClick={toggleView}
                className={`gists-view-icon ${isGridView ? 'active' : ''}`}
              />
              <img
                src={ListIcon}
                alt="Table View"
                onClick={toggleView}
                className={`gists-view-icon ${!isGridView ? 'active' : ''}`}
              />
            </div>
          </div>
          {isGridView ? <GistsGrid /> : <GistsTable />}
        </>
      ) : userDataLoading ? (
        <div>
          <h1>Loading</h1>
        </div>
      ) : (
        <div>
          <h1>Login to view your gists</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
