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

  expect(
    sumIntervals([
      [40, 73],
      [36, 75],
      [5, 42],
      [72, 95],
      [11, 81],
    ])
  ).toStrictEqual(90);
});
// https://www.codewars.com/kata/52b7ed099cdc285c300001cd/train/javascript

it('random number', () => {
  for (let testIndex = 0; testIndex < 500; testIndex++) {
    const input = new Array(50).fill(null).map(() => {
      // eslint-disable-next-line no-bitwise
      const [a, b] = [~~(Math.random() * 1000), ~~(Math.random() * 1000)];
      return [Math.min(a, b), Math.max(a, b)];
    });

    // console.log(input);
    expect(sumIntervals(input)).toStrictEqual(sumIntervals(input));
  }
});
