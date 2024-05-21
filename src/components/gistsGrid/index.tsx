import React from 'react';
import { useNavigate } from 'react-router-dom';
import './gistsGrid.scss';
import Pagination from '../pagination';
import Card from '../card';
import useGistsPagination from '../../customHooks';

const GistsGridView = () => {
  const navigate = useNavigate();
  const { currentGists, currentPage, totalPages, paginate } =
    useGistsPagination(9);

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
