import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import ForkIcon from '../../assets/forkIcon.svg';
import StarIcon from '../../assets/starIcon.svg';
import LessIcon from '../../assets/lessIcon.svg';
import GreaterIcon from '../../assets/greaterIcon.svg';
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
      <h2>GitHub Gists</h2>
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
          {currentGists.map((gist, index) => (
            <tr key={gist.id} onClick={() => navigate(`/gist/${gist.id}`)}>
              <td>{gist.owner.login}</td>
              <td>
                {gist.files[0]?.filename ? gist.files[0].filename : 'Hello'}
              </td>
              <td>
                {gist.files[0]?.filename ? gist.files[0].filename : 'Hello'}
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
      <div className="pagination-container">
        <ul className="pagination">
          <img
            src={LessIcon}
            alt="less"
            onClick={() => paginate(currentPage - 1)}
            className={`pagination-button ${
              currentPage === 1 ? 'disabled' : ''
            }`}
          />
          <span> Page</span>
          <li>{currentPage}</li>
          <span>of {totalPages}</span>
          <img
            src={GreaterIcon}
            alt="greater"
            onClick={() => paginate(currentPage + 1)}
            className={`pagination-button ${
              currentPage === totalPages ? 'disabled' : ''
            }`}
          />
        </ul>
      </div>
    </div>
  );
};

export default GistsTable;
