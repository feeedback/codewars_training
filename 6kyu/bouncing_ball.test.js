import { expect } from '@jest/globals';

import bouncingBall from './bouncing_ball.js';

it('Conditionally Tests', () => {
  expect(bouncingBall(3.0, 1, 1.5)).toEqual(-1);
  expect(bouncingBall(3.0, 0.5, 3)).toEqual(-1);
  expect(bouncingBall(3.0, -1, 1.5)).toEqual(-1);
  expect(bouncingBall(-1, 0.5, 1.5)).toEqual(-1);
});
it('Functionally Tests', () => {
  expect(bouncingBall(3.0, 0.66, 1.5)).toEqual(3);
  expect(bouncingBall(30.0, 0.66, 1.5)).toEqual(15);
});
