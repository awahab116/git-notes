import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import {
  forkGist,
  starGist,
  unstarGist,
  isGistStarred,
  deleteGist,
} from '../../api/gistsApi';
import EditIcon from '../../assets/editIcon.svg';
import DeleteIcon from '../../assets/deleteIcon.svg';
import ForkIcon from '../../assets/forkIcon.svg';
import StarIcon from '../../assets/starIcon.svg';
import StarIconFilled from '../../assets/starIconFilled.svg';
import { GistDetailsType } from '../../types/gistsDetail.type';
import './userGistInfo.scss';

type GistDetailsProps = {
  gistDetails: GistDetailsType;
  gistActions?: boolean;
};

const UserGistInfo = ({
  gistDetails,
  gistActions = false,
}: GistDetailsProps) => {
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [forkCount, setForkCount] = useState<number>(gistDetails.forks.length);
  const [isStarred, setIsStarred] = useState<boolean>(false);

  const handleGistFork = () => {
    if (userInfo?.login === gistDetails.owner.login) {
      console.log('Cannot fork your own gist');
      return;
    }

    console.log('forking gist');
    forkGist(gistDetails.id)
      .then((resp) => setForkCount((prev) => prev + 1))
      .catch((err) => console.error(err));
  };

  const handleStarGist = () => {
    console.log('handle star gist ', isStarred);
    if (isStarred) {
      unstarGist(gistDetails.id)
        .then((resp) => setIsStarred(false))
        .catch((err) => console.error(err));
    } else {
      starGist(gistDetails.id)
        .then((resp) => setIsStarred(true))
        .catch((err) => console.error(err));
    }
  };

  const handleGistDelete = () => {
    console.log('deleting gist');

    deleteGist(gistDetails.id)
      .then((_resp) => {
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (gistActions) {
      console.log('checking if gist is starred ', gistActions);
      isGistStarred(gistDetails.id)
        .then((resp) => setIsStarred(resp))
        .catch((err) => console.error(err));
    }
  }, [gistActions]);

  return (
    <div className="nested-container">
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          columnGap: '10px',
        }}
      >
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

      {gistActions && (
        <div className="gist-actions">
          {gistDetails.owner.login === userInfo?.login && (
            <>
              <div
                style={{
                  border: '1px solid #003B44',
                  borderRadius: '6px',
                  backgroundColor: '#003B44',
                }}
              >
                <button
                  onClick={() => navigate(`/update-gist/${gistDetails.id}`)}
                >
                  <img src={EditIcon} alt="" />
                  <span>Edit</span>
                </button>
              </div>
              <div
                style={{
                  border: '1px solid #003B44',
                  borderRadius: '6px',
                  backgroundColor: '#003B44',
                }}
              >
                <button onClick={handleGistDelete}>
                  <img src={DeleteIcon} alt="" />
                  <span>Delete</span>
                </button>
              </div>
            </>
          )}
          {isStarred ? (
            <button onClick={handleStarGist}>
              <img src={StarIconFilled} alt="" />
              <span>Unstar</span>
            </button>
          ) : (
            <div className="gist-star-fork-container">
              <button onClick={handleStarGist}>
                <img src={StarIcon} alt="" />
                <span
                  style={{
                    marginLeft: '0px',
                  }}
                >
                  Star
                </span>
              </button>
              <div className="gist-actions-span-container">
                <span
                  style={{
                    fontSize: '18px',
                  }}
                >
                  {forkCount}
                </span>
              </div>
            </div>
          )}
          <div className="gist-star-fork-container" onClick={handleGistFork}>
            <button>
              <img src={ForkIcon} alt="" />
              <span
                style={{
                  marginLeft: '0px',
                }}
              >
                Fork
              </span>
            </button>
            <div className="gist-actions-span-container">
              <span
                style={{
                  fontSize: '18px',
                }}
              >
                {forkCount}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGistInfo;
