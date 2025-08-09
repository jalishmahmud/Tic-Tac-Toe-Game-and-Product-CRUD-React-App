import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LS_KEY = "if_ttt_leaderboard_v1";

interface LeaderboardState {
  players: Record<string, { name: string; score: number }>;
}

const load = (): LeaderboardState => {
  try {
    const raw =
      typeof window !== "undefined" ? localStorage.getItem(LS_KEY) : null;
    return raw ? JSON.parse(raw) : { players: {} };
  } catch {
    return { players: {} };
  }
};
const save = (s: LeaderboardState) => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(s));
  } catch {}
};

const initialState: LeaderboardState =
  typeof window !== "undefined" ? load() : { players: {} };

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    addOrUpdate(state, action: PayloadAction<{ name: string; score: number }>) {
      const { name, score } = action.payload;
      if (!state.players[name]) state.players[name] = { name, score };
      else state.players[name].score += score;
      save(state);
    },
    clear(state) {
      state.players = {};
      save(state);
    },
  },
});

export const { addOrUpdate, clear } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
