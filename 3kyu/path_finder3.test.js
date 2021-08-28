import { expect } from '@jest/globals';
// import { getTimeExecution } from '../utils/test_utils.js';

import pathFinder from './path_finder3.js';

const testArea = (expectedOutput, input) => {
  expect(pathFinder(input)).toStrictEqual(expectedOutput);
};

it('Basic tests', () => {
  testArea(
    0,
    `000
000
000`
  );

  testArea(
    2,
    `010
010
010`
  );

  testArea(
    4,
    `010
101
010`
  );

  testArea(
    42,
    `0707
7070
0707
7070`
  );

  testArea(
    14,
    `700000
077770
077770
077770
077770
000007`
  );

  testArea(
    0,
    `777000
007000
007000
007000
007000
007777`
  );

  testArea(
    4,
    `000000
000000
000000
000010
000109
001010`
  );
});

// it('Performance tests', () => {
//   const [sizeX, sizeY] = [200, 200];
//   const maze = Array(sizeY)
//     .fill(null)
//     .map(() => '.'.repeat(sizeX))
//     .join('\n');

//   const [ms, returnValue] = getTimeExecution(() => pathFinder(maze), true);

//   expect(returnValue).toBeLessThanOrEqual(sizeX + sizeY - 2);
//   expect(ms).toBeLessThanOrEqual(100);
// });
