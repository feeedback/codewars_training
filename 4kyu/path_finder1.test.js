import { expect } from '@jest/globals';
// import { getTimeExecution } from '../utils/test_utils.js';

import pathFinder from './path_finder1.js';

it('Basic tests', () => {
  expect(
    pathFinder(
      `.W.
.W.
...`
    )
  ).toStrictEqual(true);

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
  ).toStrictEqual(true);

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

//   expect(getTimeExecution(() => pathFinder(maze))).toBeLessThanOrEqual(200);
// });
