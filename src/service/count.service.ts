export const numRows = 30;
export const numCols = 30;

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

const countNeighbors = (i: number, k: number, g: number[][]) => {
  let neighbors = 0;
  redundant.forEach(([x, y]) => {
    const newI = i + x;
    const newK = k + y;
    if (newI >= 0 && newK >= 0 && newI < numRows && newK < numCols) {
      neighbors += g[newI][newK];
    }
  });
  return neighbors;
};

export default { countNeighbors };
