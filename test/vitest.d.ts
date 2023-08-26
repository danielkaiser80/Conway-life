// noinspection ES6UnusedImports

import type { Assertion, AsymmetricMatchersContaining } from "vitest";

interface CustomMatchers<R = unknown> {
  toBeFoo(): R;
  toHaveDimensions(numRows: number, numCols: number): R;
  toContainOnly(...allowedValues: number[]): R;
}

declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
