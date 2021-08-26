/* eslint-disable no-magic-numbers */
module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'airbnb-base', 'prettier'],
  plugins: ['jest', 'prettier'],
  globals: {},
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    requireConfigFile: false,
  },
  parser: '@babel/eslint-parser',
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto', printWidth: 100 }],
    'import/extensions': 0,
    'no-underscore-dangle': [2, { allow: ['__filename', '__dirname'] }],
    'no-restricted-syntax': ['off', 'ForOfStatement'],
    'no-await-in-loop': 'off',
    'dot-notation': ['off'],
    'no-console': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-magic-numbers': [
      'error',
      {
        enforceConst: true,
        ignoreDefaultValues: true,
        ignoreArrayIndexes: true,
        detectObjects: true,
        ignore: [-1, 0, 1, 2, 3],
      },
    ],
    'complexity': ['error', { max: 10 }],
  },
};
