export const MOVE = {
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
};

export const CELL = {
  BRICK: "BRICK",
  BOX: "BOX",
  DOT: "DOT",
  PLAYER: "PLAYER",
  EMPTY: "EMPTY",
} as const;

export const GRID: typeof CELL[keyof typeof CELL][][][] = [
  [
    [CELL.PLAYER, CELL.EMPTY],
    [CELL.BOX, CELL.EMPTY],

    [CELL.DOT, CELL.EMPTY],
    [CELL.BRICK, CELL.EMPTY],
    [CELL.EMPTY],
  ],
  [
    [CELL.EMPTY],
    [CELL.BOX, CELL.EMPTY],
    [CELL.EMPTY],
    [CELL.BRICK, CELL.EMPTY],
    [CELL.EMPTY],
  ],
];
