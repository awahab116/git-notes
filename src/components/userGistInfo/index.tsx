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
import EditIcon from '../../assets/lighteditIcon.svg';
import DeleteIcon from '../../assets/lightdeleteIcon.svg';
import ForkIcon from '../../assets/lightforkIcon.svg';
import StarIcon from '../../assets/lightstarIcon.svg';
import StarIconFilled from '../../assets/lightstarfilledIcon.svg';
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

  const handleNavigation = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    link: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(link);
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
      <div className="user-gist-info-container">
        <div
          className="image-container"
          onClick={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
            handleNavigation(
              event,
              `/my-profile/${gistDetails.owner.name || gistDetails.owner.login}`
            )
          }
        >
          <img src={gistDetails.owner.avatar_url} alt="" />
        </div>
        <div className="text-container">
          <p>
            <span
              onClick={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
                handleNavigation(
                  event,
                  `/my-profile/${
                    gistDetails.owner.name || gistDetails.owner.login
                  }`
                )
              }
            >
              {gistDetails.owner.name || gistDetails.owner.login}
            </span>
            <span
              onClick={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
                handleNavigation(event, `/gist/${gistDetails.id}`)
              }
              className="filename-span"
            >
              {' '}
              / {Object.values(gistDetails.files)[0].filename}
            </span>
          </p>
          <p>{gistDetails?.created_at.toString()}</p>
          <p>{gistDetails.description}</p>
        </div>
      </div>

      {gistActions && (
        <div className="gist-actions">
          {gistDetails.owner.login === userInfo?.login && (
            <>
              <div className="gist-actions-ud-container">
                <button
                  onClick={() => navigate(`/update-gist/${gistDetails.id}`)}
                >
                  <img src={EditIcon} alt="" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="gist-actions-ud-container">
                <button onClick={handleGistDelete}>
                  <img src={DeleteIcon} alt="" />
                  <span>Delete</span>
                </button>
              </div>
            </>
          )}

          <div className="gist-star-fork-container">
            {isStarred ? (
              <button onClick={handleStarGist}>
                <img src={StarIconFilled} alt="" />
                <span>Unstar</span>
              </button>
            ) : (
              <button onClick={handleStarGist}>
                <img src={StarIcon} alt="" />
                <span>Star</span>
              </button>
            )}
            <div className="gist-actions-span-container">
              <span>{forkCount}</span>
            </div>
          </div>

          <div className="gist-star-fork-container" onClick={handleGistFork}>
            <button>
              <img src={ForkIcon} alt="" />
              <span>Fork</span>
            </button>
            <div className="gist-actions-span-container">
              <span>{forkCount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGistInfo;
