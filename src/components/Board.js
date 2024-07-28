import React from 'react';
import './Board.css';
import { Box } from './Box';

export const Board = ({ board, onClick }) => {
  return (
    <div className="board">
      {board.map((value, index) => (
        <Box key={index} value={value} onClick={() =>value===null && onClick(index)} />  /*so that it cannot change the value on board once assigned*/
      ))}
    </div>
  );
};
