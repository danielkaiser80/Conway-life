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

const isWithinBounds = (
  i: number,
  k: number,
  numRows: number,
  numCols: number,
) => i >= 0 && k >= 0 && i < numRows && k < numCols;

const countNeighbors = (i: number, k: number, g: number[][]) => {
  const numRows = g.length;
  const numCols = g[0].length;

  let neighbors = 0;

  for (let iterator = 0; iterator < redundant.length; iterator++) {
    const [x, y] = redundant[iterator];
    const newI = i + x;
    const newK = k + y;

    if (isWithinBounds(newI, newK, numRows, numCols)) {
      neighbors += g[newI][newK];
    }
  }

  return neighbors;
};

export default { countNeighbors };
