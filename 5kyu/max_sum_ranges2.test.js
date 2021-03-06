import { expect } from '@jest/globals';
// import { randomInt } from 'crypto';
// import { getTimeExecution } from '../utils/test_utils.js';

import maxSum from './max_sum_ranges2.js';

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

// it('Performance Tests', () => {
//   const MAX_NUM = 100;
//   const SIZE = 100_000;
//   const SIZE_RANGE = 10_000;

//   const arr = new Array(SIZE).fill(null).map(() => randomInt(MAX_NUM));

//   const range = new Array(SIZE_RANGE).fill(null).map(() => {
//     const start = randomInt(SIZE);

//     return [start, start + randomInt(SIZE - start)];
//   });

//   expect(getTimeExecution(() => maxSum(arr, range))).toBeLessThanOrEqual(40);
// });
