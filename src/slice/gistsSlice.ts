import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { Gist } from '../types/gists.type';
import { getPublicGists } from '../api/gistsApi';

export interface GistsState {
  publicGists: Gist[];
}

const initialState: GistsState = {
  publicGists: [],
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

export const gistsSlice = createSlice({
  name: 'gists',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    publicGists: (state, action) => {
      state.publicGists = action.payload;
    },
  },
});

export const { publicGists } = gistsSlice.actions;

export default gistsSlice.reducer;
