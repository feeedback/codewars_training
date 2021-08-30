import { expect } from '@jest/globals';

import sumIntervals from './sum_intervals.js';

it('should return the correct sum for non overlapping intervals', () => {
  expect(sumIntervals([[1, 5]])).toStrictEqual(4);
  expect(
    sumIntervals([
      [1, 5],
      [6, 10],
    ])
  ).toStrictEqual(8);
});

it('should return the correct sum for overlapping intervals', () => {
  expect(
    sumIntervals([
      [1, 5],
      [1, 5],
    ])
  ).toStrictEqual(4);
  expect(
    sumIntervals([
      [1, 5],
      [1, 5],
      [1, 5],
    ])
  ).toStrictEqual(4);

  expect(
    sumIntervals([
      [1, 5],
      [4, 7],
    ])
  ).toStrictEqual(6);

  expect(
    sumIntervals([
      [4, 7],
      [1, 5],
    ])
  ).toStrictEqual(6);

  expect(
    sumIntervals([
      [1, 5],
      [3, 4],
    ])
  ).toStrictEqual(4);

  expect(
    sumIntervals([
      [1, 4],
      [7, 10],
      [3, 5],
    ])
  ).toStrictEqual(7);
});
