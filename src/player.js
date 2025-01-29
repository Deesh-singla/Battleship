import { gameBoard } from "./gameBoard.js";
export const player = (name = 'computer') => {
    let board = gameBoard();
    return { name, board };
}