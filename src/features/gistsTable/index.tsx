import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import ForkIcon from '../../assets/forkIcon.svg';
import StarIcon from '../../assets/starIcon.svg';
import './gistsTable.scss';

const GistsTable = () => {
  const navigate = useNavigate();
  const publicGists = useSelector(
    (state: RootState) => state.gists.publicGists
  );

  console.log(publicGists);

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
          {publicGists.map((gist, index) => (
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
    </div>
  );
};

export default GistsTable;
