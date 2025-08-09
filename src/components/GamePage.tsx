"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./../store";
import Board from "./Board";
import {
  playMove,
  setRoundResult,
  nextRound,
  resetRound,
} from "../store/gameSlice";
import { checkWinner, isDraw } from "../lib/gameUtils";
import { addRoundWin, addPoints } from "../store/playersSlice";
import { addOrUpdate } from "../store/leaderboardSlice";
import { useRouter } from "next/navigation";

export default function GamePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const players = useSelector((s: RootState) => s.players.players);
  const game = useSelector((s: RootState) => s.game);

  useEffect(() => {
    if (!players) router.push("/");
  }, [players, router]);

  useEffect(() => {
    if (!players) return;
    if (game.roundFinished) return;
    const winner = checkWinner(game.board);
    if (winner) {
      dispatch(setRoundResult(winner));

      const loser = winner === "X" ? "O" : "X";
      dispatch(addRoundWin(winner));
      dispatch(addPoints({ player: winner, points: 2 }));
      dispatch(addPoints({ player: loser, points: 1 }));

      dispatch(addOrUpdate({ name: players[winner].name, score: 2 }));
      dispatch(addOrUpdate({ name: players[loser].name, score: 1 }));
    } else if (isDraw(game.board)) {
      dispatch(setRoundResult("draw"));
    }
  }, [game.board]);

  useEffect(() => {
    if (!players) return;
    if (!game.roundFinished) return;

    const xWins = players["X"].roundWins;
    const oWins = players["O"].roundWins;
    const roundNum = game.roundNumber;
    const remaining = 5 - roundNum;

    if (xWins > oWins + remaining || oWins > xWins + remaining) {
      router.push("/result");
      return;
    }

    if (xWins >= 3 || oWins >= 3) {
      router.push("/result");
      return;
    }

    if (roundNum >= 5) {
      router.push("/result");
      return;
    }

    const nextStarter = game.currentTurn === "X" ? "O" : "X";
    const tid = setTimeout(() => dispatch(nextRound({ nextStarter })), 900);
    return () => clearTimeout(tid);
  }, [game.roundFinished]);

  if (!players) return null;

  const handleCell = (i: number) => {
    if (game.roundFinished) return;
    if (game.board[i]) return;
    dispatch(playMove(i));
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold">
            Round {game.roundNumber} / 5
          </h2>
          <div className="flex gap-3 mt-2">
            <div className="p-2 bg-white rounded shadow">
              <div className="text-sm font-medium">X</div>
              <div className="font-semibold">{players.X.name}</div>
              <div className="text-xs text-gray-500">
                Rounds: {players.X.roundWins} • Points: {players.X.score}
              </div>
            </div>
            <div className="p-2 bg-white rounded shadow">
              <div className="text-sm font-medium">O</div>
              <div className="font-semibold">{players.O.name}</div>
              <div className="text-xs text-gray-500">
                Rounds: {players.O.roundWins} • Points: {players.O.score}
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Turn</div>
          <div className="font-semibold">
            {game.currentTurn} — {players[game.currentTurn].name}
          </div>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => router.push("/leaderboard")}
              className="px-3 py-1 rounded border"
            >
              Leaderboard
            </button>
            <button
              onClick={() => dispatch(resetRound())}
              className="px-3 py-1 rounded border"
            >
              Reset Board
            </button>
          </div>
        </div>
      </div>

      <Board board={game.board} onCellClick={handleCell} />

      {game.roundFinished && (
        <div className="mt-4 p-3 bg-indigo-50 rounded">
          {game.roundResult === "draw" ? (
            <div className="font-medium">Round ended in a draw.</div>
          ) : (
            <div className="font-medium">
              {players[game.roundResult!].name} won this round.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
