import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './About';
import HomePage from './HomePage';
import GamePage from './GamePage';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/gamepage" element={<GamePage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};
export default App;