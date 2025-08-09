import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../types";

interface PlayersState {
  players: { X: Player; O: Player } | null;
}

const initialState: PlayersState = { players: null };

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayers(state, action: PayloadAction<{ xName: string; oName: string }>) {
      const { xName, oName } = action.payload;
      state.players = {
        X: { id: "X", name: xName, score: 0, roundWins: 0 },
        O: { id: "O", name: oName, score: 0, roundWins: 0 },
      };
    },
    addRoundWin(state, action: PayloadAction<"X" | "O">) {
      if (!state.players) return;
      state.players[action.payload].roundWins += 1;
    },
    addPoints(
      state,
      action: PayloadAction<{ player: "X" | "O"; points: number }>
    ) {
      if (!state.players) return;
      state.players[action.payload.player].score += action.payload.points;
    },
    resetMatch(state) {
      if (!state.players) return;
      state.players.X.roundWins = 0;
      state.players.O.roundWins = 0;
      state.players.X.score = 0;
      state.players.O.score = 0;
    },
    clearPlayers(state) {
      state.players = null;
    },
  },
});

export const { setPlayers, addRoundWin, addPoints, resetMatch, clearPlayers } =
  playersSlice.actions;
export default playersSlice.reducer;
