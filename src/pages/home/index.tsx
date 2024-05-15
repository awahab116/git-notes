import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import GistsGrid from '../../features/gistsGrid/gistsGrid';
import GistsTable from '../../features/gistsTable';
import { getGists } from '../../slice/gistsSlice';
import GridIcon from '../../assets/gridIcon.svg';
import ListIcon from '../../assets/listIcon.svg';
import './home.scss';

const Home: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isGridView, setIsGridView] = useState(false);

  useEffect(() => {
    dispatch(getGists());
  }, [dispatch]);

  const toggleView = () => {
    setIsGridView((prevState) => !prevState);
  };

  return (
    <div className="home-container">
      <div className="gists-view">
        <img
          src={GridIcon}
          alt="Grid View"
          onClick={toggleView}
          className="gists-view-icon"
        />
        <div className="separate-icons"></div>
        <img
          src={ListIcon}
          alt="Table View"
          onClick={toggleView}
          className="gists-view-icon"
        />
      </div>
      {isGridView ? <GistsGrid /> : <GistsTable />}
    </div>
  );
};
export default Home;
