import { useNavigate } from 'react-router-dom';
import Pagination from '../pagination';
import './gistsTable.scss';
import useGistsPagination from '../../customHooks';
import ForkStarGist from '../forkStarGist';

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
            <tr
              key={gist.id}
              // onClick={() => navigate(`/gist/${gist.id}`)}
            >
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
                <ForkStarGist gist={gist} />
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
