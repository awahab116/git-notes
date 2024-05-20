import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import './gistsGrid.scss';
import ForkIcon from '../../assets/forkIcon.svg';
import StarIcon from '../../assets/starIcon.svg';
import Pagination from '../pagination';
import Card from '../card';

const GistsGridView = () => {
  const navigate = useNavigate();
  const publicGists = useSelector(
    (state: RootState) => state.gists.publicGists
  );
  const [currentPage, setCurrentPage] = useState(1);
  const gistsPerPage = 9;

  const indexOfLastGist = currentPage * gistsPerPage;
  const indexOfFirstGist = indexOfLastGist - gistsPerPage;
  const currentGists = publicGists.slice(indexOfFirstGist, indexOfLastGist);
  const totalPages = Math.ceil(publicGists.length / gistsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="gists-grid-container">
      <div className="grid">
        {currentGists.map((gist) => (
          <Card key={gist.id} gist={gist} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
};

export default GistsGridView;
