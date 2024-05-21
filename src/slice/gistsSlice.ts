import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { getPublicGists, getUserGists } from '../api/gistsApi';
import { Gist } from '../types/gists.type';

export interface GistsState {
  publicGists: Gist[];
  userGists: Gist[];
  searchedGists?: Gist[];
}

const initialState: GistsState = {
  publicGists: [],
  userGists: [],
  searchedGists: [],
};

export const getGists = () => async (dispatch: Dispatch) => {
  try {
    const response = await getPublicGists();
    console.log('gist response', response);

    dispatch(publicGists(response));
  } catch (e) {
    console.error(e);
  }
};

export const fetchUserGists =
  (username: string) => async (dispatch: Dispatch) => {
    try {
      const response = await getUserGists(username);

      if (response) {
        console.log('user gists response', response);
        dispatch(userGistsLoaded(response));
      } else {
        console.error('Error while loading user gists');
      }
    } catch (e) {
      console.error(e);
    }
  };

export const gistsSlice = createSlice({
  name: 'gists',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    publicGists: (state, action) => {
      state.publicGists = action.payload;
    },
    userGistsLoaded: (state, action) => {
      state.userGists = action.payload;
    },
    deleteUserGist(state, action) {
      const gistIdToDelete = action.payload;
      console.log('user gists before delete', state.userGists, gistIdToDelete);
      state.userGists = state.userGists.filter(
        (gist) => gist.id !== gistIdToDelete
      );
      console.log('user gists after delete', state.userGists);
    },
    searchGists(state, action) {
      const searchQuery = action.payload;
      //find gists which contains searchQuery string in login
      if (searchQuery.length) {
        state.searchedGists = state.publicGists.filter((gist) =>
          gist.owner.login.includes(searchQuery)
        );
      } else {
        state.searchedGists = [];
      }
    },
  },
});

export const { publicGists, userGistsLoaded, deleteUserGist, searchGists } =
  gistsSlice.actions;

export default gistsSlice.reducer;
