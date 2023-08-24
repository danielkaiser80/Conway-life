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
  const numRows = g.length;
  const numCols = g[0].length;

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
