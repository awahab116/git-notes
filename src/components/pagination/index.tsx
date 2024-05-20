import React from 'react';
import LessIcon from '../../assets/lessIcon.svg';
import GreaterIcon from '../../assets/greaterIcon.svg';
import './pagination.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginate,
}) => {
  return (
    <div className="pagination-container">
      <ul className="pagination">
        <img
          src={LessIcon}
          alt="previous"
          onClick={() => paginate(currentPage - 1)}
          className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
        />
        <span>Page</span>
        <li>{currentPage}</li>
        <span>of {totalPages}</span>
        <img
          src={GreaterIcon}
          alt="next"
          onClick={() => paginate(currentPage + 1)}
          className={`pagination-button ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
        />
      </ul>
    </div>
  );
};

export default Pagination;
