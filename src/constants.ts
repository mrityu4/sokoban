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
    [CELL.EMPTY],
    [CELL.EMPTY],
    [CELL.BRICK],
    [CELL.BRICK],
    [CELL.BRICK],
    [CELL.BRICK],
    [CELL.BRICK],
    [CELL.EMPTY],
  ],
  [
    [CELL.BRICK],
    [CELL.BRICK],
    [CELL.BRICK],
    [CELL.EMPTY],
    [CELL.EMPTY],
    [CELL.EMPTY],
    [CELL.BRICK],
    [CELL.EMPTY],
  ],
  [
    [CELL.BRICK],
    [CELL.DOT],
    [CELL.PLAYER],
    [CELL.BOX, CELL.EMPTY],
    [CELL.EMPTY],
    [CELL.EMPTY],
    [CELL.BRICK],
    [CELL.EMPTY],
  ],
  [
    [CELL.BRICK],
    [CELL.BRICK],
    [CELL.BRICK],
    [CELL.EMPTY],
    [CELL.BOX],
    [CELL.DOT, CELL.EMPTY],
    [CELL.BRICK],
    [CELL.EMPTY],
  ],
  [
    [CELL.BRICK],
    [CELL.DOT],
    [CELL.BRICK],
    [CELL.BRICK],
    [CELL.BOX],
    [CELL.EMPTY],
    [CELL.BRICK],
    [CELL.EMPTY],
  ],
  [
    [CELL.BRICK],
    [CELL.EMPTY],
    [CELL.BRICK],
    [CELL.EMPTY],
    [CELL.DOT],
    [CELL.EMPTY],
    [CELL.BRICK],
    [CELL.BRICK],
  ],
  [
    [CELL.BRICK],
    [CELL.BOX],
    [CELL.EMPTY],
    [CELL.DOT, CELL.BOX],
    [CELL.BOX],
    [CELL.BOX],
    [CELL.DOT],
    [CELL.BRICK],
  ],
  [
    [CELL.BRICK],
    [CELL.EMPTY],
    [CELL.EMPTY],
    [CELL.EMPTY],
    [CELL.DOT],
    [CELL.EMPTY],
    [CELL.EMPTY],
    [CELL.BRICK],
  ],[
    [CELL.BRICK],
    [CELL.BRICK],
    [CELL.BRICK],
    [CELL.BRICK],
    [CELL.BRICK],
    [CELL.BRICK],
    [CELL.BRICK],
    [CELL.BRICK],
  ],
];
