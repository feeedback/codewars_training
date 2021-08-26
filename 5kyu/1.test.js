/* eslint-disable no-magic-numbers */
import { randomInt } from 'crypto';
import { expect } from '@jest/globals';
import { getTimeExecution } from '../utils/test_utils.js';

import maxSum from './1.js';

it('Functionally Tests', () => {
  expect(
    maxSum(
      [1, -2, 3, 4, -5, -4, 3, 2, 1],
      [
        [1, 3],
        [0, 4],
        [6, 8],
      ]
    )
  ).toEqual(6);

  expect(maxSum([1, -2, 3, 4, -5, -4, 3, 2, 1], [[1, 3]])).toEqual(5);
});

it('Performance Tests', () => {
  const MAX_NUM = 1000;
  const SIZE = 100_000;
  const SIZE_RANGE = 100_000;

  const arr = new Array(SIZE).fill(null).map(() => randomInt(MAX_NUM));

  const range = new Array(SIZE_RANGE).fill(null).map(() => {
    const start = randomInt(SIZE);

    return [start, start + randomInt(SIZE - start)];
  });

  expect(getTimeExecution(() => maxSum(arr, range))).toBeLessThanOrEqual(30);
});
