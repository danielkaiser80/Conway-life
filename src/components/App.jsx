import React, { useRef, useState, useCallback } from "react";
import produce from "immer";

const numRows = 30;
const numCols = 30;

const redundant = [
  [0.1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

function App() {
  const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  };

  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const generateRandomStuff = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.5 ? 1 : 0))
      );
    }
    return rows;
  };

  const [Simulation, setSimulation] = useState(false);

  const runningRef = useRef(Simulation);
  runningRef.current = Simulation;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            redundant.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newK >= 0 && newI < numRows && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
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
      >
        {Simulation ? "Stop" : "start"} Simulation
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <button
          onClick={() => {
            setGrid(generateEmptyGrid());
          }}
        >
          Clear
        </button>
        <button
          onClick={() => {
            setGrid(generateRandomStuff());
          }}
        >
          Random Stuff
        </button>
      </div>
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              className="table"
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              key={`${i}-${k}`}
              style={{
                width: 15,
                height: 15,
                background: grid[i][k] ? "#000" : undefined
              }}
            ></div>
          ))
        )}
      </div>
      <div style={{ justifyContent: "space-between", textAlign: "left" }}>
        <ul
          style={{
            textAlign: "left",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "800px",
            backgroundColor: "#000"
          }}
        >
          <h2>Game Of Life Transitions</h2>
          <li>
            {" "}
            Any live cell with fewer than two live neighbours dies, as if by
            underpopulation.
          </li>
          <li>
            {" "}
            Any live cell with two or three live neighbours lives on to the next
            generation.
          </li>
          <li>
            {" "}
            Any live cell with more than three live neighbours dies, as if by
            overpopulation.
          </li>
          <li>
            {" "}
            Any dead cell with exactly three live neighbours becomes a live
            cell, as if by reproduction.
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;
