"use client";
import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <nav className="flex items-center gap-4 bg-white/60 backdrop-blur p-3 rounded shadow-sm">
      <Link href="/tic-tac-toe/" className="text-sm font-medium">
        Setup
      </Link>
      <Link href="/tic-tac-toe/game" className="text-sm font-medium">
        Game
      </Link>
      <Link href="/tic-tac-toe/leaderboard" className="text-sm font-medium">
        Leaderboard
      </Link>
    </nav>
  );
}
