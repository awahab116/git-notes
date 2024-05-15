import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserGistInfo from '../userGistInfo';
import { getGistDetails } from '../../api/gistsApi';
import { Gist } from '../../types/gists.type';
import { GistDetailsType } from '../../types/gistsDetail.type';
import './card.scss';

type GistCardProps = {
  gist: Gist;
};

const Card = ({ gist }: GistCardProps) => {
  const [gistDetails, setGistDetails] = useState<GistDetailsType>();

  useEffect(() => {
    getGistDetails(gist.id)
      .then((resp) => setGistDetails(resp))
      .catch((err) => console.error(err));
  }, []);

  if (!gistDetails) {
    return <p>Loading...</p>;
  }

  return (
    <Link to={`/gist/${gist.id}`} className="card">
      <div className="card">
        <div className="first-element">
          {Object.values(gistDetails.files)[0].content}
        </div>
        <div className="second-element">
          <UserGistInfo gistDetails={gistDetails} />
        </div>
      </div>
    </Link>
  );
};

export default Card;
