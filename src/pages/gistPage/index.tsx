import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserGistInfo from '../../components/userGistInfo';
import GistContent from '../../components/gistContent';
import type { RootState } from '../../app/store';
import { GistDetailsType } from '../../types/gistsDetail.type';
import { getGistDetails } from '../../api/gistsApi';
import './gistPage.scss';

const GistPage: React.FC = () => {
  const { id } = useParams();
  const [gistDetails, setGistDetails] = useState<GistDetailsType>();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    if (id) {
      getGistDetails(id)
        .then((resp) => setGistDetails(resp))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!gistDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="main-container">
      <UserGistInfo gistDetails={gistDetails} gistActions={!!userInfo} />
      <GistContent gistDetails={gistDetails} />
    </div>
  );
};

export default GistPage;
