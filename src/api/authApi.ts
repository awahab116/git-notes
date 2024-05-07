import { serverInstance } from './axiosInstance';

export const userGithubLogin = async (code: string) => {
  try {
    const response = await serverInstance.post('/authenticate', { code });

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (e) {
    return Promise.reject(e);
  }
};
