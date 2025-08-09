export type PlayerId = "X" | "O";

export interface Player {
  id: PlayerId;
  name: string;
  score: number;
  roundWins: number;
}

export type Cell = PlayerId | null;
export type Board = Cell[];
