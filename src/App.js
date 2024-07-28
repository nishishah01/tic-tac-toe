import React, { useState } from 'react';
import './App.css';
import { Board } from "./components/Board";
import { Reset } from './components/Reset';
import { ScoreBoard } from './components/ScoreBoard';

function App() {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);

  const handleBoxClick = (boxIndex) => {
    if (board[boxIndex] === null) {
      const updatedBoard = board.map((value, index) => {
        if (index === boxIndex) {
          return xPlaying ? "X" : "O";
        } else {
          return value;
        }
      });

      const winner = checkWinner(updatedBoard);
      if (winner) {
        if (winner === "O") {
          setScores((prevScores) => ({ ...prevScores, oScore: prevScores.oScore + 1 }));
        } else {
          setScores((prevScores) => ({ ...prevScores, xScore: prevScores.xScore + 1 }));
        }
        setGameOver(true);
      }

      setBoard(updatedBoard);
      setXPlaying(!xPlaying);
    }
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];
      if (board[x] && board[x] === board[y] && board[x] === board[z]) {
        return board[x];
      }
    }
    return null;
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setXPlaying(true);
    setGameOver(false);
  };

  const resetGame = () => {
    setScores({ xScore: 0, oScore: 0 });
    resetBoard();
  };

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <Reset resetBoard={resetGame} />
    </div>
  );
}

export default App;
