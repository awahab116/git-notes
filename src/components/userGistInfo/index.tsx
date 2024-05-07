import React from 'react';
import { GistDetailsType } from '../../types/gistsDetail.type';
import './userGistInfo.scss';

type GistDetailsProps = {
  gistDetails: GistDetailsType;
};

const UserGistInfo = ({ gistDetails }: GistDetailsProps) => {
  return (
    <div className="nested-container">
      <div className="image-container">
        <img src={gistDetails.owner.avatar_url} alt="" />
      </div>
      <div className="text-container">
        <p>
          {gistDetails.owner.name || gistDetails.owner.login}/{' '}
          {Object.values(gistDetails.files)[0].filename}
        </p>
        <p>{gistDetails?.created_at.toString()}</p>
        <p>{gistDetails.description}</p>
      </div>
    </div>
  );
};

export default UserGistInfo;
