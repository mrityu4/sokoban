import { useEffect, useRef, useState } from "react";
import Confetti from "react-lightweight-confetti";
import "./App.css";
import boxImg from "./assets/box.jpg";
import filledBoxImg from "./assets/filledBox.jpg";
import playerImg from "./assets/player.png";
import brickImg from "./assets/wall.png";
import { CELL, GRID, MOVE } from "./constants";

type Pos = { x: number; y: number };

const checkIfWon = ({ grid }: { grid: typeof GRID }) => {
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

const givePosAfterMove = ({
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

const cellTypeAtPos = ({ pos, grid }: { pos: Pos; grid: typeof GRID }) =>
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

const addCellTypeAtPos = ({
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

const removeCellTypeAtPos = ({
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

const isMovePossible = ({
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

const findStartingPlayerPosInGrid = () => {
  for (let x = 0; x < GRID.length; ++x) {
    for (let y = 0; y < GRID[0].length; ++y) {
      if (GRID[x][y].includes("PLAYER")) return { x, y } as Pos;
    }
  }
  return { x: 0, y: 0 };
};

function App() {
  const [grid, setGrid] = useState(GRID);
  const [pos, setPos] = useState<Pos>(() => findStartingPlayerPosInGrid());
  const [won, setWon] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, []);

  // Function to focus the div when it's clicked
  const handleClick = () => {
    if (divRef.current) {
      divRef.current.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const gridChanges = isMovePossible({ pos, move: e.key, grid });
    if (!gridChanges) return;
    let newGrid = structuredClone(grid);
    const { newPlayerPos, newBoxPos } = gridChanges;
    if (newPlayerPos && newBoxPos) {
      newGrid = addCellTypeAtPos({
        pos: newBoxPos,
        grid: newGrid,
        cellType: CELL.BOX,
      });
      newGrid = removeCellTypeAtPos({
        pos: newPlayerPos,
        grid: newGrid,
        cellType: CELL.BOX,
      });
    }
    if (newPlayerPos && !newBoxPos) {
      newGrid = addCellTypeAtPos({
        pos: newPlayerPos,
        grid: newGrid,
        cellType: CELL.PLAYER,
      });
      newGrid = removeCellTypeAtPos({
        pos,
        grid: newGrid,
        cellType: CELL.PLAYER,
      });
    }
    setGrid(newGrid);
    setWon(checkIfWon({ grid: newGrid }));

    setPos(newPlayerPos);
  };
  return (
    <div>
      <div
        tabIndex={0} // Make the div focusable
        ref={divRef} // Assign the ref to the div element
        onClick={handleClick} // Focus on click
        style={{ border: "1px solid black", padding: "10px" }}
        onKeyDown={handleKeyPress}
      >
        Focusable Div
        {grid.map((row, x) => (
          <div className="flex">
            {row.map((c, y) => (
              <div className="relative w-16 h-16">
                {x === pos.x && y === pos.y && (
                  <img className="w-16 h-16 absolute" src={playerImg} alt="" />
                )}
                {c.includes("BRICK") && (
                  <img className="w-16 h-16 absolute" src={brickImg} alt="" />
                )}
                {c.includes("BOX") && (
                  <img className="w-16 h-16 absolute" src={boxImg} alt="" />
                )}{" "}
                {c.includes("DOT") && (
                  <div className="w-5 h-5 absolute bg-red-200 rounded-md m-5" />
                )}
                {c.includes("DOT") && c.includes("BOX") && (
                  <img
                    className="w-16 h-16 absolute"
                    src={filledBoxImg}
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Confetti start={won} />
    </div>
  );
}

export default App;
