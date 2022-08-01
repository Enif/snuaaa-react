import React from 'react';
import BoardType from '../types/BoardType';

const defaultBoards: {
    boardsInfo: BoardType[];
    setBoardsInfo: (boards: BoardType[]) => void;
} = {
  boardsInfo: [],
  setBoardsInfo: () => {}
};

const BoardContext = React.createContext(defaultBoards);

export default BoardContext;