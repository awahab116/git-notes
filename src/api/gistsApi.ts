import { githubInstance } from './axiosInstance';
import { GistApiType } from '../types/gistsApi.type';

export const getPublicGists = async () => {
  try {
    const response = await githubInstance.get('/gists/public');

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getGistDetails = async (id: string) => {
  try {
    const response = await githubInstance.get(`/gists/${id}`);

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getUserGists = async (username: string) => {
  try {
    const response = await githubInstance.get(`/users/${username}/gists`);

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const createGist = async (data: GistApiType) => {
  try {
    console.log('in api file', data);
    const response = await githubInstance.post('/gists', data);

    if (response.status === 201) {
      return response.data;
    } else {
      return null;
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const updateGist = async (data: GistApiType, id: string) => {
  try {
    const response = await githubInstance.patch(`/gists/${id}`, data);

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const deleteGist = async (id: string) => {
  try {
    const response = await githubInstance.delete(`/gists/${id}`);

    if (response.status === 204) {
      return true;
    } else {
      return null;
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const forkGist = async (id: string) => {
  try {
    const response = await githubInstance.post(`/gists/${id}/forks`);

    if (response.status === 201) {
      return response.data;
    } else {
      return null;
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const isGistStarred = async (id: string) => {
  try {
    console.log('id ', id);
    const response = await githubInstance.get(`/gists/${id}/star`);
    console.log('response gist star ', response);
    if (response.status === 204) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export const starGist = async (id: string) => {
  try {
    const response = await githubInstance.put(`/gists/${id}/star`);

    if (response.status === 204) {
      return true;
    } else {
      return null;
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const unstarGist = async (id: string) => {
  try {
    const response = await githubInstance.delete(`/gists/${id}/star`);

    if (response.status === 204) {
      return true;
    } else {
      return null;
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getGist = async (id: string) => {
  try {
    const response = await githubInstance.get(`/gists/${id}`);

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (e) {
    return Promise.reject(e);
  }
};
