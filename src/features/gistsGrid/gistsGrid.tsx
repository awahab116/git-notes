import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Card from '../../components/card';
import './gistsGrid.scss';

const GistsGrid = () => {
  const publicGists = useSelector(
    (state: RootState) => state.gists.publicGists
  );

  return (
    <div className="grid">
      {publicGists.map((gist) => (
        <Card key={gist.id} gist={gist} />
      ))}
    </div>
  );
};

export default GistsGrid;
