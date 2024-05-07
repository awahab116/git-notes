import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import About from '../pages/about';
import GistPage from '../pages/gistPage';
import RootLayout from '../layouts/root';
import Login from '../pages/login';
import './App.scss';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gist/:id" element={<GistPage />} />
        </Route>
      </Routes>
    </div>
  );
};
