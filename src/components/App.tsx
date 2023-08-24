import { useCallback, useRef, useState } from "react";
import { produce } from "immer";
import Cell from "./Cell";
import countService from "../service/count.service";
import Transitions from "./documentation/Transitions";

export const numRows = 30;
export const numCols = 30;

const App = () => {
  const generateEmptyGrid = () => {
    const rows: number[][] = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  };

  const [grid, setGrid] = useState(generateEmptyGrid);

  const generateRandomStuff = () => {
    const rows: number[][] = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.5 ? 1 : 0)),
      );
    }
    return rows;
  };

  const [Simulation, setSimulation] = useState(false);

  const runningRef = useRef(Simulation);
  runningRef.current = Simulation;

  const produceNewGrid = (g: number[][]) => (gridCopy: number[][]) => {
    for (let i = 0; i < numRows; i++) {
      for (let k = 0; k < numCols; k++) {
        const neighbors = countService.countNeighbors(i, k, g);
        if (neighbors < 2 || neighbors > 3) {
          gridCopy[i][k] = 0;
        } else if (g[i][k] === 0 && neighbors === 3) {
          gridCopy[i][k] = 1;
        }
      }
    }
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => produce(g, produceNewGrid(g)));
    setTimeout(runSimulation, 100);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setSimulation(!Simulation);
          if (!Simulation) {
            runningRef.current = true;
            runSimulation();
          }
        }}
        type="button"
      >
        {Simulation ? "Stop" : "Start"} Simulation
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <button onClick={() => setGrid(generateEmptyGrid())} type="button">
          Clear
        </button>
        <button onClick={() => setGrid(generateRandomStuff())} type="button">
          Random Stuff
        </button>
      </div>
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((_, k) => (
            <Cell
              alive={grid[i][k]}
              key={`${i}-${k}`} // eslint-disable-line react/no-array-index-key
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
            />
          )),
        )}
      </div>
      <Transitions />
    </>
  );
};

export default App;
