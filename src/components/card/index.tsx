import { useEffect, useState } from 'react';

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
  }, [gist.id]);

  if (!gistDetails) {
    return <p>Loading...</p>;
  }

  const contentWithLineNumbers = Object.values(gistDetails.files)[0]
    .content.split('\n')
    .map((line, index) => {
      const lineNumber = index + 1;
      return (
        <div className="line-wrapper" key={index}>
          <span className="line-number">{lineNumber}</span>
          <span className="line-content">{line}</span>
        </div>
      );
    });

  return (
    <div className="card">
      <div className="first-element">
        {contentWithLineNumbers}
        <div className="filename-hover-effect">
          {Object.values(gistDetails.files)[0].filename}
        </div>
      </div>
      <div className="second-element">
        <UserGistInfo gistDetails={gistDetails} />
      </div>
    </div>
  );
};

export default Card;
