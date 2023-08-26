import { numCols, numRows } from "../config/constants";

const generateEmptyGrid = () => {
  const rows: number[][] = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const generateRandomStuff = () => {
  const rows: number[][] = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => (Math.random() > 0.5 ? 1 : 0)));
  }
  return rows;
};

export default { generateEmptyGrid, generateRandomStuff };
