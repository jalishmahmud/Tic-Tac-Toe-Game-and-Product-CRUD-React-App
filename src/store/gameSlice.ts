import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { emptyBoard } from "../lib/gameUtils";

interface GameState {
  board: ("X" | "O" | null)[];
  currentTurn: "X" | "O";
  roundNumber: number;
  roundFinished: boolean;
  roundResult: "X" | "O" | "draw" | null;
}

const initialState: GameState = {
  board: emptyBoard(),
  currentTurn: "X",
  roundNumber: 1,
  roundFinished: false,
  roundResult: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startMatch(
      state,
      action: PayloadAction<{ startingTurn?: "X" | "O" } | undefined>
    ) {
      state.board = emptyBoard();
      state.currentTurn = action.payload?.startingTurn ?? "X";
      state.roundNumber = 1;
      state.roundFinished = false;
      state.roundResult = null;
    },
    playMove(state, action: PayloadAction<number>) {
      const i = action.payload;
      if (state.roundFinished) return;
      if (state.board[i] !== null) return;
      state.board[i] = state.currentTurn;
      state.currentTurn = state.currentTurn === "X" ? "O" : "X";
    },
    setRoundResult(state, action: PayloadAction<"X" | "O" | "draw">) {
      state.roundResult = action.payload;
      state.roundFinished = true;
    },
    nextRound(
      state,
      action: PayloadAction<{ nextStarter?: "X" | "O" } | undefined>
    ) {
      state.board = emptyBoard();
      state.roundNumber += 1;
      state.roundFinished = false;
      state.roundResult = null;
      if (action.payload?.nextStarter)
        state.currentTurn = action.payload.nextStarter;
    },
    resetRound(state) {
      state.board = emptyBoard();
      state.roundFinished = false;
      state.roundResult = null;
    },
  },
});

export const { startMatch, playMove, setRoundResult, nextRound, resetRound } =
  gameSlice.actions;
export default gameSlice.reducer;
