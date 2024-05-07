import React, { FC, useEffect } from 'react';
import GistsGrid from '../../features/gistsGrid/gistsGrid';
import GridIcon from '../../assets/gridIcon.svg';
import ListIcon from '../../assets/listIcon.svg';
import { useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { getGists } from '../../slice/gistsSlice';
import './home.scss';

let buttonText = 'Click';

const Home: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getGists());
  }, [dispatch]);

  return (
    <div className="home-container">
      <div className="gists-view">
        <img src={GridIcon} alt="" />
        <div className="separate-icons"></div>
        <img src={ListIcon} alt="" />
      </div>
      <GistsGrid />
    </div>
  );
};
export default Home;
