import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const useGistsPagination = (gistsPerPage: number) => {
  const publicGists = useSelector(
    (state: RootState) => state.gists.publicGists
  );
  const searchedGists =
    useSelector((state: RootState) => state.gists.searchedGists) ?? [];
  const [currentPage, setCurrentPage] = useState(1);

  const gists = searchedGists.length > 0 ? searchedGists : publicGists;

  const indexOfLastGist = currentPage * gistsPerPage;
  const indexOfFirstGist = indexOfLastGist - gistsPerPage;
  const currentGists = gists.slice(indexOfFirstGist, indexOfLastGist);
  const totalPages = Math.ceil(gists.length / gistsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return { currentGists, currentPage, totalPages, paginate };
};

export default useGistsPagination;
