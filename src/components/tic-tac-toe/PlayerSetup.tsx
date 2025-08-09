"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setPlayers } from "../../store/playersSlice";
import { startMatch } from "../../store/gameSlice";

export default function PlayerSetup() {
  const [xName, setXName] = useState("");
  const [oName, setOName] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const canStart = xName.trim() !== "" && oName.trim() !== "";

  const handleStart = () => {
    if (!canStart) return;
    dispatch(setPlayers({ xName: xName.trim(), oName: oName.trim() }));
    dispatch(startMatch({ startingTurn: "X" }));
    router.push("/tic-tac-toe/game");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Player Setup</h1>
      <div className="grid grid-cols-1 gap-3 max-w-md">
        <label className="flex flex-col">
          <span className="text-sm font-medium">Player X</span>
          <input
            value={xName}
            onChange={(e) => setXName(e.target.value)}
            className="mt-1 p-2 border rounded"
            placeholder="Name for X"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium">Player O</span>
          <input
            value={oName}
            onChange={(e) => setOName(e.target.value)}
            className="mt-1 p-2 border rounded"
            placeholder="Name for O"
          />
        </label>
        <div className="pt-2">
          <button
            onClick={handleStart}
            disabled={!canStart}
            className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-50"
          >
            Start Match
          </button>
        </div>
      </div>
    </div>
  );
}
