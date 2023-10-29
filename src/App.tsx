import { useEffect, useRef, useState } from "react";
import Confetti from "react-lightweight-confetti";
import "./App.css";
import boxImg from "./assets/box.jpg";
import filledBoxImg from "./assets/filledBox.jpg";
import playerImg from "./assets/player.png";
import brickImg from "./assets/wall.png";
import { CELL, GRID } from "./constants";
import {
  addCellTypeAtPos,
  checkIfWon,
  findStartingPlayerPosInGrid,
  isMovePossible,
  removeCellTypeAtPos,
} from "./utils";

type Pos = { x: number; y: number };

function App() {
  const [grid, setGrid] = useState(GRID);
  const [pos, setPos] = useState<Pos>(() => findStartingPlayerPosInGrid());
  const [won, setWon] = useState(true);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, [won]);

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

  const resetGame = () => {
    setGrid(GRID);
    setWon(false);
    setPos(() => findStartingPlayerPosInGrid());
  };

  return (
    <div className="flex justify-center items-center w-screen">
      {!won ? (
        <div
          tabIndex={0} // Make the div focusable
          ref={divRef} // Assign the ref to the div element
          onClick={handleClick} // Focus on click
          onKeyDown={handleKeyPress}
        >
          {grid.map((row, x) => (
            <div className="flex" key={x}>
              {row.map((c, y) => (
                <div className="relative w-16 h-16 " key={`${x}-${y}`}>
                  {" "}
                  {c.includes("DOT") && (
                    <div className="w-5 h-5 absolute bg-red-200 rounded-md m-5" />
                  )}
                  {x === pos.x && y === pos.y && (
                    <img
                      className="w-16 h-16 absolute"
                      src={playerImg}
                      alt=""
                    />
                  )}
                  {c.includes("BRICK") && (
                    <img className="w-16 h-16 absolute" src={brickImg} alt="" />
                  )}
                  {c.includes("BOX") && (
                    <img className="w-16 h-16 absolute" src={boxImg} alt="" />
                  )}{" "}
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
      ) : (
        <div className="relative flex justify-center items-center ">
          <div className="absolute ">
            <h1 className="mb-12">🎉 🥳 Congrats! You have won 🏆</h1>
            <button onClick={resetGame}>Reset & Replay</button>
          </div>
          <Confetti start={won} />
        </div>
      )}
    </div>
  );
}

export default App;
