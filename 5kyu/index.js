const maxSum2 = (arr, range) => {
  let max = -Infinity;

  // range.sort(([prevS, prevF], [nextS, nextF]) => (nextS - prevS) || (prevF - nextF));
  // console.log({ range });

  for (let index = 0; index < range.length; index++) {
    const [startIndex, finishIndex] = range[index];
    let sum = 0;

    let i = startIndex;

    while (i <= finishIndex) {
      sum += arr[i];
      i += 1;
    }

    if (sum > max) {
      max = sum;
    }
  }
  return max;
};
const maxSum3 = (arr, range) => {
  let max = -Infinity;
  const { length } = arr;
  const sumAll = [];

  for (let i = 0; i < length; i++) {
    sumAll[i] = new Array(length).fill(null);

    for (let j = i; j < length; j++) {
      sumAll[i][j] = (sumAll[i][j - 1] || 0) + arr[j];
      // console.log({ last: sumAll[i][j - 1], current: arr[j], sum: sumAll[i][j] });
      // // console.log({ i, j });
    }
  }

  for (let index = 0; index < range.length; index++) {
    const [startIndex, finishIndex] = range[index];
    const sum = sumAll[startIndex][finishIndex];

    if (sum > max) {
      max = sum;
    }
  }
  return max;
};
const maxSum = (arr, range) => {
  // O(n+m), по памяти: O(n)

  let sumAcc = 0;
  const leftPrefixSumList = [0];

  for (let index = 0; index < arr.length; index++) {
    sumAcc += arr[index];

    leftPrefixSumList[index + 1] = sumAcc;
  }

  let max = -Infinity;

  for (let index = 0; index < range.length; index++) {
    const [startIndex, finishIndex] = range[index];

    const sumRange = leftPrefixSumList[finishIndex + 1] - leftPrefixSumList[startIndex];

    if (sumRange > max) {
      max = sumRange;
    }
  }

  return max;
};
function maxSumTree(arr, range) {
  const bt = _binaryIndexedTree(arr);
  let m = 1 << 31;
  for (const [a, b] of range) {
    const s = bt.sum(a, b);
    if (s > m) m = s;
  }
  return m;
}

function _binaryIndexedTree(arr) {
  const n = arr.length;
  const bt = new Int32Array(n + 1);
  for (let i = 0; i < n; ++i) _update(bt, i, arr[i]);
  bt.sum = (i, j) => _sum(j) - _sum(i - 1);
  return bt;

  function _update(bt, i, v) {
    ++i;
    while (i <= n) bt[i] += v, i += i & -i;
  }
  function _sum(i) {
    ++i;
    let s = 0;
    while (i > 0) s += bt[i], i -= i & -i;
    return s;
  }
}

const MAX_NUM = 1000;
const SIZE = 1_000_000;
const SIZE_RANGE = 100_000;

const arr = new Array(SIZE).fill(null).map(() => ~~(Math.random() * MAX_NUM));
const range = new Array(SIZE_RANGE).fill(null).map(() => {
  const start = ~~(Math.random() * SIZE);
  const end = start + ~~(Math.random() * (SIZE - start - 2));
  return [start, end];
});
// console.log(arr, range);
// console.time('O(n^2)');
// console.log(maxSum2(arr, range));
// console.timeEnd('O(n^2)');
console.time('tree');
console.log(maxSumTree(arr, range));
console.timeEnd('tree');
console.time('leftSum');
console.log(maxSum(arr, range));
console.timeEnd('leftSum');

module.exports = maxSum;
