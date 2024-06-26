import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { userGithubLogin } from '../api/authApi';
import { userGistsLoaded } from './gistsSlice';

export interface User {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
}

export interface AuthState {
  isUserLoggedIn: boolean;
  userInfo: User | null;
  userDataLoaded: boolean;
}

export const loginUser = (code: string) => async (dispatch: Dispatch) => {
  try {
    // Make a POST request to retrieve access token
    const githubLoginResponse = await userGithubLogin(code);

    // Dispatch actions based on response
    if (githubLoginResponse) {
      console.log('in data ', githubLoginResponse);
      dispatch(githubUserLogin(githubLoginResponse));
    } else {
      dispatch(githubUserLogout());
    }
  } catch (error) {
    console.error(error);
  }
};

export const userDataLoaded =
  (isLoading: Boolean = false) =>
  async (dispatch: Dispatch) => {
    dispatch(githubUserDataLoaded(isLoading));
  };

export const logoutUser = () => async (dispatch: Dispatch) => {
  dispatch(githubUserLogout());
  dispatch(userGistsLoaded([]));
};

const initialState: AuthState = {
  isUserLoggedIn:
    localStorage.getItem('isUserLoggedIn') !== null
      ? localStorage.getItem('isUserLoggedIn') === 'true'
      : false,
  userInfo: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : undefined,
  userDataLoaded: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    githubUserLogin: (state, action) => {
      console.log('in action github ', action);
      state.isUserLoggedIn = true;
      state.userDataLoaded = false;
      state.userInfo = action.payload.user;
      localStorage.setItem('isUserLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    githubUserLogout: (state) => {
      state.isUserLoggedIn = false;
      state.userInfo = null;
      localStorage.removeItem('isUserLoggedIn');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    githubUserDataLoaded: (state, action) => {
      console.log('in action userLoaded', action);
      state.userDataLoaded = action.payload;
    },
  },
});

export const { githubUserLogin, githubUserLogout, githubUserDataLoaded } =
  authSlice.actions;

export default authSlice.reducer;
