import { githubInstance } from './axiosInstance';

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
