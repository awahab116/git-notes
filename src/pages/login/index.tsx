import { useEffect } from 'react';

const LoginPage = () => {
  useEffect(() => {
    const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=user,gist`;
    window.location.href = githubOAuthURL;
  }, []);

  return null;
};

export default LoginPage;
