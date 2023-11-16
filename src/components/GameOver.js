import React from 'react';
import { GameOverContainer } from '../styles';

const GameOver = ({ score, onRestart }) => {
  return (
    <GameOverContainer>
      <h2>Game Over</h2>
      <p>Your City Score: {score}</p>
      <button onClick={onRestart}>Restart</button>
    </GameOverContainer>
  );
};

export default GameOver;
