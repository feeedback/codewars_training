// https://www.codewars.com/kata/583d10c03f02f41462000137

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

export default maxSum;
