import { vi } from "vitest";
import gridGeneratorService from "./grid-generator.service";
import { numCols, numRows } from "../config/constants";

vi.mock("../config/constants", () => ({
  numCols: 3,
  numRows: 3,
}));

expect.extend({
  toContainOnly(received: number[][], ...allowedValues: number[]) {
    const isValid = received.every((row) =>
      row.every((element) => allowedValues.includes(element)),
    );
    return {
      pass: isValid,
      message: () =>
        isValid
          ? `Expected the array to contain only ${allowedValues.join(
              " or ",
            )} but received: ${JSON.stringify(received)}`
          : `Expected the array to contain only ${allowedValues.join(
              " or ",
            )}, but found other values in the array: ${JSON.stringify(
              received,
            )}`,
    };
  },
});

expect.extend({
  toHaveDimensions(
    received: number[][],
    expectedRows: number,
    expectedColumns: number,
  ) {
    const actualRows = received.length;
    const actualColumns = received.reduce(
      (max, row) => Math.max(max, row.length),
      0,
    );

    const isValid =
      actualRows === expectedRows && actualColumns === expectedColumns;

    return {
      pass: isValid,
      message: () =>
        isValid
          ? `Expected the array to have dimensions ${expectedRows}x${expectedColumns}, but received ${actualRows}x${actualColumns}: ${JSON.stringify(
              received,
            )}`
          : `Expected the array to have dimensions ${expectedRows}x${expectedColumns}, but found ${actualRows}x${actualColumns}: ${JSON.stringify(
              received,
            )}`,
    };
  },
});

const { generateRandomStuff, generateEmptyGrid } = gridGeneratorService;

describe("gridGeneratorService", () => {
  describe(generateEmptyGrid, () => {
    it("should correctly generate an empty grid", () => {
      const result = generateEmptyGrid();
      expect(result).toHaveDimensions(numRows, numCols);
      expect(result).toContainOnly(0);
    });
  });

  describe(generateRandomStuff, () => {
    it("should correctly generate a random grid", () => {
      const result = generateRandomStuff();
      expect(result).toHaveDimensions(numRows, numCols);
      expect(result).toContainOnly(0, 1);
    });
  });
});
