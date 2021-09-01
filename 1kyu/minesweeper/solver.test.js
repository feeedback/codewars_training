import { expect } from '@jest/globals';

import minesweeperSolver from './solver.js';

const testMS = (mineCount, inputArea, expectedArea, expectedOutput = expectedArea) => {
  expect(minesweeperSolver(inputArea, mineCount, expectedArea, true)).toEqual(expectedOutput);
};

it('Functionally Tests', () => {
  testMS(1, '0 ? ?\n0 ? ?', '0 1 ?\n0 1 ?', '?');
  testMS(2, '0 ? ?\n0 ? ?', '0 2 x\n0 2 x');

  testMS(
    6,
    `? ? ? ? 0 0 0
? ? ? ? 0 ? ?
? ? ? 0 0 ? ?
? ? ? 0 0 ? ?
0 ? ? ? 0 0 0
0 ? ? ? 0 0 0
0 ? ? ? 0 ? ?
0 0 0 0 0 ? ?
0 0 0 0 0 ? ?`,
    `1 x x 1 0 0 0
2 3 3 1 0 1 1
1 x 1 0 0 1 x
1 1 1 0 0 1 1
0 1 1 1 0 0 0
0 1 x 1 0 0 0
0 1 1 1 0 1 1
0 0 0 0 0 1 x
0 0 0 0 0 1 1`
  );
});
