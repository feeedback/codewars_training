import { afterEach, expect } from '@jest/globals';

import IamHere from './path_finder3.js';

afterEach(() => {
  IamHere.lastPosition = { x: 0, y: 0, radAngle: 0 };
});

function WhereAreYou(input, expectedOutput) {
  expect(IamHere(input).join()).toStrictEqual(expectedOutput.join());
}

test('Basic tests', () => {
  WhereAreYou('', [0, 0]);
  WhereAreYou('RLrl', [0, 0]);
});
test('Basic tests', () => {
  WhereAreYou('r5L2l4', [4, 3]);
});
test('Basic tests', () => {
  WhereAreYou('10r5r0', [-10, 5]);
});
