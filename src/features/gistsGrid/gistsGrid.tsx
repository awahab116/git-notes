import Card from '../../components/card';
import { RootState, AppDispatch } from '../../app/store';
import { useSelector } from 'react-redux';
import './gistsGrid.scss';

const GistsGrid = () => {
  const publicGists = useSelector(
    (state: RootState) => state.gists.publicGists
  );
  const numCards = 8;

  return (
    <div className="grid">
      {publicGists.map((gist) => (
        <Card key={gist.id} gist={gist} />
      ))}
    </div>
  );
};

export default GistsGrid;
