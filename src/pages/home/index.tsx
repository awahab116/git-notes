import React, { FC, useEffect, useState } from 'react';
import GistsGrid from '../../features/gistsGrid/gistsGrid';
import GistsTable from '../../features/gistsTable'; // Assuming you have a component for the table view
import GridIcon from '../../assets/gridIcon.svg';
import ListIcon from '../../assets/listIcon.svg';
import { useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { getGists } from '../../slice/gistsSlice';
import './home.scss';

const Home: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isGridView, setIsGridView] = useState(false); // Initial state is grid view

  useEffect(() => {
    dispatch(getGists());
  }, [dispatch]);

  const toggleView = () => {
    setIsGridView((prevState) => !prevState); // Toggle between grid and table view
  };

  return (
    <div className="home-container">
      <div className="gists-view">
        <img
          src={GridIcon}
          alt="Grid View"
          onClick={toggleView}
          style={{ cursor: 'pointer' }}
        />
        <div className="separate-icons"></div>
        <img
          src={ListIcon}
          alt="Table View"
          onClick={toggleView}
          style={{ cursor: 'pointer' }}
        />
      </div>
      {isGridView ? <GistsGrid /> : <GistsTable />}
    </div>
  );
};
export default Home;
