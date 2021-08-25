/**
 * @jest-environment jsdom
 */

const maxSum = require('./index.js');

describe('Basic Tests', () => {
  it('It should works for basic tests', () => {
    expect(maxSum([1, -2, 3, 4, -5, -4, 3, 2, 1], [[1, 3], [0, 4], [6, 8]])).toEqual(6);
    // expect(maxSum([1, -2, 3, 4, -5, -4, 3, 2, 1], [[1, 3]])).toEqual(5);
    // expect(maxSum([1, -2, 3, 4, -5, -4, 3, 2, 1], [[1, 2], [2, 5], [1, 5], [4, 5]])).toEqual(0);
  });
});
