import { expect } from '@jest/globals';

import IamHere from './path_finder3.js';

function WhereAreYou(input, expectedOutput) {
  expect(IamHere(input).join()).toStrictEqual(expectedOutput.join());
}

it('Basic tests', () => {
  WhereAreYou('', [0, 0]);
  WhereAreYou('RLrl', [0, 0]);
  WhereAreYou('r5L2l4', [4, 3]);
  WhereAreYou('10r5r0', [-10, 5]);
});
