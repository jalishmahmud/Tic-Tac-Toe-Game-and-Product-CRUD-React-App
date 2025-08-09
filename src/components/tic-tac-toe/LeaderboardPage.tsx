"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { clear } from "../../store/leaderboardSlice";

export default function LeaderboardPage() {
  const dispatch = useDispatch();
  const players = useSelector((s: RootState) => s.leaderboard.players);
  const list = Object.values(players).sort((a, b) => b.score - a.score);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Session Leaderboard</h1>
      <div className="space-y-2">
        {list.length === 0 && (
          <div className="text-gray-500">No scores yet.</div>
        )}
        {list.map((p) => (
          <div
            key={p.name}
            className="p-3 bg-white rounded shadow flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-500">Total points</div>
            </div>
            <div className="text-xl font-semibold">{p.score}</div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={() => dispatch(clear())}
          className="px-4 py-2 rounded bg-red-600 text-white"
        >
          Clear Leaderboard
        </button>
      </div>
    </div>
  );
}
