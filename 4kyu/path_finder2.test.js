import { expect } from '@jest/globals';
// import { getTimeExecution } from '../utils/test_utils.js';

import pathFinder from './path_finder2.js';

it('Basic tests', () => {
  expect(
    pathFinder(
      `.W.
.W.
...`
    )
  ).toStrictEqual(4);

  expect(
    pathFinder(
      `.W.
.W.
W..`
    )
  ).toStrictEqual(false);

  expect(
    pathFinder(
      `......
......
......
......
......
......`
    )
  ).toStrictEqual(10);

  expect(
    pathFinder(
      `......
......
......
......
.....W
....W.`
    )
  ).toStrictEqual(false);
});

// it('Performance tests', () => {
//   const [sizeX, sizeY] = [200, 200];
//   const maze = Array(sizeY)
//     .fill(null)
//     .map(() => '.'.repeat(sizeX))
//     .join('\n');

//   const [ms, returnValue] = getTimeExecution(() => pathFinder(maze), true);

//   expect(returnValue).toBeLessThanOrEqual(sizeX + sizeY - 2);
//   expect(ms).toBeLessThanOrEqual(110);
// });
