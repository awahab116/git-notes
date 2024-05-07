// Card.js

import React, { useEffect, useState } from 'react';
import { Gist } from '../../types/gists.type';
import { getGistDetails } from '../../api/gistsApi';
import { GistDetailsType } from '../../types/gistsDetail.type';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './card.scss';
import UserGistInfo from '../userGistInfo';

type GistCardProps = {
  gist: Gist;
};

const Card = ({ gist }: GistCardProps) => {
  const [gistDetails, setGistDetails] = useState<GistDetailsType>();
  const navigate = useNavigate();

  useEffect(() => {
    getGistDetails(gist.id)
      .then((resp) => setGistDetails(resp))
      .catch((err) => console.error(err));
  }, []);

  if (!gistDetails) {
    return <p>Loading...</p>;
  }

  const handleClick = () => {
    navigate(`/gist/${gist.id}`);
  };

  return (
    <Link to={`/gist/${gist.id}`} className="card">
      <div className="card" onClick={handleClick}>
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

// Card.js

import React, { useEffect, useState } from 'react';
import { Gist } from '../../types/gists.type';
import { getGistDetails } from '../../api/gistsApi';
import { GistDetailsType } from '../../types/gistsDetail.type';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './card.scss';
import UserGistInfo from '../userGistInfo';

type GistCardProps = {
  gist: Gist;
};

const Card = ({ gist }: GistCardProps) => {
  const [gistDetails, setGistDetails] = useState<GistDetailsType>();
  const navigate = useNavigate();

  useEffect(() => {
    getGistDetails(gist.id)
      .then((resp) => setGistDetails(resp))
      .catch((err) => console.error(err));
  }, []);

  if (!gistDetails) {
    return <p>Loading...</p>;
  }

  const handleClick = () => {
    navigate(`/gist/${gist.id}`);
  };

  return (
    <Link to={`/gist/${gist.id}`} className="card">
      <div className="card" onClick={handleClick}>
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
