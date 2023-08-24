import { expect, it } from "vitest";
import { render } from "@testing-library/react";
import Transitions from "./Transitions";

it(Transitions, () => {
  const { container } = render(<Transitions />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="MuiBox-root css-75jswg"
      >
        <ul
          class="MuiList-root MuiList-padding css-11jlxdr-MuiList-root"
        >
          <li
            class="MuiListSubheader-root MuiListSubheader-gutters MuiListSubheader-sticky css-uob957-MuiListSubheader-root"
          >
            Game Of Life Transitions
          </li>
          <li
            class="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-1p823my-MuiListItem-root"
          >
            Any live cell with fewer than two live neighbours dies, as if by underpopulation.
          </li>
          <li
            class="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-1p823my-MuiListItem-root"
          >
            Any live cell with two or three live neighbours lives on to the next generation.
          </li>
          <li
            class="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-1p823my-MuiListItem-root"
          >
            Any live cell with more than three live neighbours dies, as if by overpopulation.
          </li>
          <li
            class="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-1p823my-MuiListItem-root"
          >
            Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
          </li>
        </ul>
      </div>
    </div>
  `);
});
