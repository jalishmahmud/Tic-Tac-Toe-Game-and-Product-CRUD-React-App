import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import playersReducer from "./playersSlice";
import gameReducer from "./gameSlice";
import leaderboardReducer from "./leaderboardSlice";
import productsReducer from "./productsSlice";

export const store = configureStore({
  reducer: {
    players: playersReducer,
    game: gameReducer,
    leaderboard: leaderboardReducer,
    products: productsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
