import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import GistPage from '../pages/gistPage';
import CreateGist from '../pages/createGist';
import RootLayout from '../layouts/root';
import MyProfile from '../pages/myProfile';
import LoginPage from '../pages/login';
import ProtectedRoute from '../components/hocRoutes';
import './App.scss';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/gist/:id"
            element={
              <ProtectedRoute>
                <div>
                  <GistPage />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-gist"
            element={
              <ProtectedRoute>
                <div>
                  <CreateGist />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-gist/:id"
            element={
              <ProtectedRoute>
                <div>
                  <CreateGist />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-profile/:username"
            element={
              <ProtectedRoute>
                <div>
                  <MyProfile />
                </div>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};
