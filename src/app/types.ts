export type Direction = "up" | "down" | "left" | "right";

export interface Point {
  x: number;
  y: number;
}

export interface RecordIndex {
  start: number;
  end: number;
}

export interface Move {
  direction: Direction;
  distance: number;
}