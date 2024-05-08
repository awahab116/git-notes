import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GistDetailsType } from '../../types/gistsDetail.type';
import { getGistDetails } from '../../api/gistsApi';
import UserGistInfo from '../../components/userGistInfo';
import './gistPage.scss';

const GistPage: React.FC = () => {
  const { id } = useParams();
  const [gistDetails, setGistDetails] = useState<GistDetailsType>();

  useEffect(() => {
    if (id) {
      getGistDetails(id)
        .then((resp) => setGistDetails(resp))
        .catch((err) => console.error(err));
    }
  }, [id]);

  useEffect(() => {
    console.log(gistDetails);
  }, [gistDetails]);

  if (!gistDetails) {
    return <p>Loading...</p>;
  }

  const fileContents = Object.values(gistDetails.files).map((file) => (
    <div className="code-container" key={file.filename}>
      <div className="file-name">{file.filename}</div>
      <div className="border-bottom"></div>
      <div>
        <p style={{ textAlign: 'left', whiteSpace: 'break-spaces' }}>
          {file.content}
        </p>
      </div>
    </div>
  ));

  return (
    <div className="main-container">
      <UserGistInfo gistDetails={gistDetails} />
      {/* change fileContent to component */}
      {fileContents}
    </div>
  );
};

export default GistPage;
