import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Game of Life!</h1>
      <p>The Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970.</p>
      <p>The rules of the game are simple:</p>
      <ul>
        <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
        <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
        <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
        <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
      </ul>
      <div><Link to="/gamepage">Begin Game</Link></div>
      <div><Link to="/about">Credit</Link></div>
      
      
    </div>
  );
}

export default HomePage;