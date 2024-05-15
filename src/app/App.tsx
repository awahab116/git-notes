import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import GistPage from '../pages/gistPage';
import CreateGist from '../pages/createGist';
import RootLayout from '../layouts/root';
import MyProfile from '../pages/myProfile';
import './App.scss';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/gist/:id" element={<GistPage />} />
          <Route path="/create-gist" element={<CreateGist />} />
          <Route path="/update-gist/:id" element={<CreateGist />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Route>
      </Routes>
    </div>
  );
};
