"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./../store";
import { resetMatch, clearPlayers } from "../store/playersSlice";
import { startMatch } from "../store/gameSlice";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const players = useSelector((s: RootState) => s.players.players);
  const dispatch = useDispatch();
  const router = useRouter();

  if (!players) {
    router.push("/");
    return null;
  }

  const x = players.X;
  const o = players.O;
  const winnerText =
    x.score === o.score
      ? "Match Draw"
      : x.score > o.score
      ? `${x.name} wins the match`
      : `${o.name} wins the match`;

  const restartSame = () => {
    dispatch(resetMatch());
    dispatch(startMatch({ startingTurn: "X" }));
    router.push("/game");
  };
  const newMatch = () => {
    dispatch(clearPlayers());
    router.push("/");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Match Result</h1>
      <div className="grid grid-cols-1 gap-3 max-w-md">
        <div className="p-3 bg-white rounded shadow">
          <div className="text-sm text-gray-500">
            {x.id} — {x.name}
          </div>
          <div className="font-bold text-lg">Points: {x.score}</div>
          <div className="text-sm text-gray-500">Round wins: {x.roundWins}</div>
        </div>
        <div className="p-3 bg-white rounded shadow">
          <div className="text-sm text-gray-500">
            {o.id} — {o.name}
          </div>
          <div className="font-bold text-lg">Points: {o.score}</div>
          <div className="text-sm text-gray-500">Round wins: {o.roundWins}</div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-indigo-50 rounded">
        <div className="text-lg font-semibold">{winnerText}</div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={restartSame}
          className="px-4 py-2 rounded bg-green-600 text-white"
        >
          Restart (same players)
        </button>
        <button onClick={newMatch} className="px-4 py-2 rounded border">
          New Match
        </button>
      </div>
    </div>
  );
}
