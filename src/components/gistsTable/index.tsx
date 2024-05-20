import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import ForkIcon from '../../assets/forkIcon.svg';
import StarIcon from '../../assets/starIcon.svg';
import Pagination from '../pagination';
import './gistsTable.scss';

const GistsTable = () => {
  const navigate = useNavigate();
  const publicGists = useSelector(
    (state: RootState) => state.gists.publicGists
  );
  const [currentPage, setCurrentPage] = useState(1);
  const gistsPerPage = 10;

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
          {currentGists.map((gist, _index) => (
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
