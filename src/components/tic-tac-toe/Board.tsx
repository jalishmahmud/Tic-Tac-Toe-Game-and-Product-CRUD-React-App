"use client";
import React from "react";
import { Board as BoardType } from "../../types/tic-tac-toe";

interface Props {
  board: BoardType;
  onCellClick: (i: number) => void;
  disabledCells?: boolean;
}

export default function Board({ board, onCellClick }: Props) {
  return (
    <div className="grid grid-cols-3 w-fit mx-auto border border-gray-400">
      {board.map((cell, i) => (
        <button
          key={i}
          aria-label={`cell-${i}`}
          onClick={() => onCellClick(i)}
          className={`w-24 h-24 flex items-center justify-center text-3xl font-bold rounded border bg-white`}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}
