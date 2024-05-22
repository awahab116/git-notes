import './forkStarGist.scss';
import ForkIcon from '../../assets/forkIcon.svg';
import StarIcon from '../../assets/starIcon.svg';
import StarIconFilled from '../../assets/starIconfilled.svg';
import forkIconFilled from '../../assets/forkIconfilled.svg';
import { Gist } from '../../types/gists.type';
import { useEffect, useState } from 'react';
import {
  forkGist,
  starGist,
  unstarGist,
  isGistStarred,
  getUserGists,
  getGistForks,
} from '../../api/gistsApi';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

type GistCardProps = {
  gist: Gist;
};

const ForkStarGist = ({ gist }: GistCardProps) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [isStarred, setIsStarred] = useState<boolean>(false);
  const [isForked, setIsForked] = useState<boolean>(false);

  useEffect(() => {
    if (userInfo) {
      isGistStarred(gist.id)
        .then((resp) => setIsStarred(resp))
        .catch((err) => console.error(err));

      Promise.all([getUserGists(userInfo.login), getGistForks(gist.id)])
        .then(([userGists, gistForks]) => {
          console.log('userGists', userGists);
          console.log('gistForks', gistForks);
          const forked = userGists.some((userGist: Gist) =>
            gistForks.some((fork: Gist) => fork.id === userGist.id)
          );
          setIsForked(forked);
        })
        .catch((err) => console.error(err));
    }
  }, [gist, userInfo]);

  const handleGistFork = () => {
    if (userInfo?.login === gist.owner.login) {
      console.log('Cannot fork your own gist');
      return;
    }

    forkGist(gist.id)
      .then((resp) => setIsForked(true))
      .catch((err) => console.error(err));
  };

  const handleStarGist = () => {
    if (isStarred) {
      unstarGist(gist.id)
        .then((resp) => setIsStarred(false))
        .catch((err) => console.error(err));
    } else {
      starGist(gist.id)
        .then((resp) => setIsStarred(true))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="icons-container">
      <img
        src={isForked ? forkIconFilled : ForkIcon}
        alt="fork"
        className="icon"
        onClick={handleGistFork}
      />
      <img
        src={isStarred ? StarIconFilled : StarIcon}
        alt="star"
        className="icon"
        onClick={handleStarGist}
      />
    </div>
  );
};

export default ForkStarGist;
