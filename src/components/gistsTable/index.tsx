import React from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../pagination';
import './gistsTable.scss';
import ForkIcon from '../../assets/forkIcon.svg';
import StarIcon from '../../assets/starIcon.svg';
import useGistsPagination from '../../customHooks';

const GistsTable = () => {
  const navigate = useNavigate();
  const { currentGists, currentPage, totalPages, paginate } =
    useGistsPagination(10);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Notebook Name</th>
            <th>Keyword</th>
            <th>Updated</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentGists.map((gist) => (
            <tr key={gist.id} onClick={() => navigate(`/gist/${gist.id}`)}>
              <td>{gist.owner.login}</td>
              <td>
                {Object.values(gist.files)[0].filename
                  ? Object.values(gist.files)[0].filename
                  : 'Hello'}
              </td>
              <td>
                <button className="table-button">Keyword</button>
              </td>
              <td>{gist.updated_at.toString()}</td>
              <td>
                <div className="icons-container">
                  <img src={ForkIcon} alt="fork" />
                  <img src={StarIcon} alt="star" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
};

export default GistsTable;
