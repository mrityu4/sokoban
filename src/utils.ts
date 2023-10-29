import { CELL, GRID, MOVE } from "./constants";
type Pos = { x: number; y: number };
export const checkIfWon = ({ grid }: { grid: typeof GRID }) => {
  for (const row of grid) {
    for (const cell of row) {
      if (cell.includes("DOT")) {
        if (cell.includes("BOX")) continue;
        else return false;
      }
    }
  }
  return true;
};

export const givePosAfterMove = ({
  pos,
  move,
}: {
  pos: Pos;
  move: typeof MOVE[keyof typeof MOVE];
}) => {
  switch (move) {
    case MOVE.UP:
      if (pos.x > 0) {
        return { x: pos.x - 1, y: pos.y };
      } else return false;
    case MOVE.DOWN:
      if (pos.x < GRID.length - 1) {
        return { x: pos.x + 1, y: pos.y };
      } else return false;
    case MOVE.RIGHT:
      if (pos.y < GRID[0].length - 1) {
        return { x: pos.x, y: pos.y + 1 };
      } else return false;
    case "ArrowLeft":
      if (pos.y > 0) {
        return { x: pos.x, y: pos.y - 1 };
      } else return false;
  }
};

export const cellTypeAtPos = ({ pos, grid }: { pos: Pos; grid: typeof GRID }) =>
  grid[pos.x][pos.y];

const setCellTypeAtPos = ({
  pos,
  grid,
  cellTypes,
}: {
  pos: Pos;
  grid: typeof GRID;
  cellTypes: typeof CELL[keyof typeof CELL][];
}) => {
  grid[pos.x][pos.y] = cellTypes;
  return grid;
};

export const addCellTypeAtPos = ({
  pos,
  grid,
  cellType,
}: {
  pos: Pos;
  grid: typeof GRID;
  cellType: typeof CELL[keyof typeof CELL];
}) => {
  const newCell = cellTypeAtPos({ pos, grid });
  newCell.push(cellType);
  return setCellTypeAtPos({ pos, grid, cellTypes: newCell });
};

export const removeCellTypeAtPos = ({
  pos,
  grid,
  cellType,
}: {
  pos: Pos;
  grid: typeof GRID;
  cellType: typeof CELL[keyof typeof CELL];
}) => {
  const newCell = cellTypeAtPos({ pos, grid }).filter(
    (type) => type != cellType
  );
  return setCellTypeAtPos({ pos, grid, cellTypes: newCell });
};

export const isMovePossible = ({
  pos,
  move,
  grid,
}: {
  pos: Pos;
  move: typeof MOVE[keyof typeof MOVE];
  grid: typeof GRID;
}) => {
  const newPlayerPos = givePosAfterMove({ pos, move });
  //new playerPos out of board
  if (!newPlayerPos) return;
  const newPlayerCell = cellTypeAtPos({ pos: newPlayerPos, grid });

  //player is trying to push a box
  if (newPlayerCell.includes(CELL.BOX)) {
    const newBoxPos = givePosAfterMove({ pos: newPlayerPos, move });
    //new BoxPos out of board
    if (!newBoxPos) return;
    const newBoxCell = cellTypeAtPos({ pos: newBoxPos, grid });

    //new boxPos contains brick or another box
    if (newBoxCell.includes(CELL.BRICK) || newBoxCell.includes(CELL.BOX))
      return;
    //valid push
    return { newPlayerPos, newBoxPos };
    //player is trying to push a brick
  } else if (newPlayerCell.includes(CELL.BRICK)) {
    return;
  }
  return { newPlayerPos };
};

export const findStartingPlayerPosInGrid = () => {
  for (let x = 0; x < GRID.length; ++x) {
    for (let y = 0; y < GRID[0].length; ++y) {
      if (GRID[x][y].includes("PLAYER")) return { x, y } as Pos;
    }
  }
  return { x: 0, y: 0 };
};
