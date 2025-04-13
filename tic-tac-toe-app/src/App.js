import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [showWinner, setShowWinner] = useState(false);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setShowWinner(true);
        setTimeout(() => setShowWinner(false), 3000);
        return;
      }
    }
    if (board.every(cell => cell)) {
      setWinner('Draw');
      setShowWinner(true);
      setTimeout(() => setShowWinner(false), 3000);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setShowWinner(false);
  };

  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>
      <p>Current Player: {isXNext ? 'X' : 'O'}</p>
      {winner && showWinner && (
        <div className="winner-popup">
          {winner === 'Draw' ? 'Game is a Draw!' : `Winner: ${winner}`}
        </div>
      )}
      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${!board[index] && !isXNext ? 'o-highlight' : ''} ${
              !board[index] && isXNext ? 'x-highlight' : ''
            }`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default App;