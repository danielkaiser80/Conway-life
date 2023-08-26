import { numCols, numRows } from "../config/constants";

const redundant = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const isWithinBounds = (i: number, k: number) =>
  i >= 0 && k >= 0 && i < numRows && k < numCols;

const countNeighbors = (i: number, k: number, g: number[][]) => {
  let neighbors = 0;

  for (let iterator = 0; iterator < redundant.length; iterator++) {
    const [x, y] = redundant[iterator];
    const newI = i + x;
    const newK = k + y;

    if (isWithinBounds(newI, newK)) {
      neighbors += g[newI][newK];
    }
  }

  return neighbors;
};

export default { countNeighbors };
