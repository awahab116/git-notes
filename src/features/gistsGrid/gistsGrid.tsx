// import Card from '../../components/card';
// import { RootState, AppDispatch } from '../../app/store';
// import { useSelector } from 'react-redux';
// import './gistsGrid.scss';

// const GistsGrid = () => {
//   const publicGists = useSelector(
//     (state: RootState) => state.gists.publicGists
//   );
//   const numCards = 8;

//   return (
//     <div className="grid">
//       {publicGists.map((gist) => (
//         <Card key={gist.id} gist={gist} />
//       ))}
//     </div>
//   );
// };

// export default GistsGrid;

import Card from '../../components/card';
import { RootState, AppDispatch } from '../../app/store';
import { useSelector } from 'react-redux';
import './gistsGrid.scss';

const GistsGrid = () => {
  const publicGists = useSelector(
    (state: RootState) => state.gists.publicGists
  );
  const numCards = 8;

  // Slice the array to get only the first 8 elements
  const first8Gists = publicGists.slice(0, numCards);

  return (
    <div className="grid">
      {first8Gists.map((gist) => (
        <Card key={gist.id} gist={gist} />
      ))}
    </div>
  );
};

export default GistsGrid;
