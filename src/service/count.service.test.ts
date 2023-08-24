import countService from "./count.service";

// Example grid for testing
const grid = [
  [0, 1, 0],
  [1, 0, 1],
  [0, 1, 0],
];

const { countNeighbors } = countService;

describe("countNeighbors", () => {
  it("should count neighbors correctly for an inner cell", () => {
    const result = countNeighbors(1, 1, grid);
    // In this case, there are four neighbors with a value of 1
    expect(result).toBe(4);
  });

  it("should count neighbors correctly for a corner cell", () => {
    const result = countNeighbors(0, 0, grid);
    // In this case, there are two neighbors with a value of 1
    expect(result).toBe(2);
  });

  it("should count neighbors correctly for an edge cell", () => {
    const result = countNeighbors(1, 0, grid);
    expect(result).toBe(2);
  });

  it("should return 0 correctly for an empty grid", () => {
    const result = countNeighbors(1, 0, [
      [0, 0],
      [0, 0],
    ]);
    expect(result).toBe(0);
  });
});
