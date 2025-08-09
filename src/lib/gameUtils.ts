import { Board, PlayerId } from "../types";

export const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function emptyBoard(): Board {
  return Array(9).fill(null);
}

export function checkWinner(board: Board): PlayerId | null {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a] as PlayerId;
  }
  return null;
}

export function isDraw(board: Board): boolean {
  return board.every((c) => c !== null) && checkWinner(board) === null;
}
