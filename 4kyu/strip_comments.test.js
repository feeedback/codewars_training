import { expect } from '@jest/globals';

import stripComments from './strip_comments.js';

it('test', () => {
  function checkComments(input, markers, expected) {
    expect(stripComments(input, markers)).toStrictEqual(expected);
  }

  checkComments(
    'apples, plums % and bananas\npears\noranges !applesauce',
    ['%', '!'],
    'apples, plums\npears\noranges'
  );
  checkComments('Q @b\nu\ne -e f g', ['@', '-'], 'Q\nu\ne');
});
