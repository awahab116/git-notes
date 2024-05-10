import axios from 'axios';

const serverInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const githubInstance = axios.create({
  baseURL: process.env.REACT_APP_GITHUB_URL,
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
});

console.log(
  'process.env.REACT_APP_GITHUB_URL',
  process.env.REACT_APP_GITHUB_URL
);

githubInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

serverInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    //console.error(error);
    return Promise.reject(error);
  }
);

githubInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    //console.error(error);
    return Promise.reject(error);
  }
);

export { serverInstance, githubInstance };
