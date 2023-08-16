import { fireEvent, render } from "@testing-library/react";
import { vi } from "vitest";
import Cell from "./Cell";

describe("Cell component", () => {
  it("should render with alive state", () => {
    const { container } = render(<Cell alive={1} onClick={() => {}} />);
    const cellElement = container.firstChild;

    expect(cellElement).toHaveStyle("background-color: #000");
  });

  it("should render with dead state", () => {
    const { container } = render(<Cell alive={0} onClick={() => {}} />);
    const cellElement = container.firstChild;

    expect(cellElement).toHaveStyle("background-color: #6bbe92");
  });

  it("should call onClick handler when clicked", () => {
    const onClickMock = vi.fn();
    const { container } = render(<Cell alive={1} onClick={onClickMock} />);
    const cellElement = container.firstChild;

    expect(cellElement).not.toBeNull();
    fireEvent.click(cellElement!); // force IntelliJ to understand the "expect" line above

    expect(onClickMock).toHaveBeenCalled();
  });
});
