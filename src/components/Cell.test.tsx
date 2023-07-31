import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { expect } from "vitest";
import Cell from "./Cell";

test("clicking first button changes value to O", () => {
  let alive = 1;
  const board = (
    <Cell
      alive={alive}
      onClick={() => {
        alive = 0;
      }}
    />
  );
  render(board);

  const allBoxes = screen.getAllByRole("checkbox");
  const box = allBoxes[0];
  fireEvent.click(box);

  expect(alive).toEqual(0);
});
