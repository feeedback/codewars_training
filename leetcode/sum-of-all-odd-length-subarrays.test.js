import { test, expect } from '@jest/globals';
import fn from './sum-of-all-odd-length-subarrays.js';

test('1', () => {
  expect(fn([1, 4, 2, 5, 3])).toStrictEqual(58);
});
