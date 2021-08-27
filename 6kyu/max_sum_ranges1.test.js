/* eslint-disable no-magic-numbers */
import { expect } from '@jest/globals';

import maxSum from './max_sum_ranges1.js';

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
