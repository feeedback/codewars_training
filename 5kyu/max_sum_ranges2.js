/**
 * The maximum sum value of ranges -- Challenge version {@link https://www.codewars.com/kata/583d171f28a0c04b7c00009c}
 *
 * @param { [number] } arr max length - 100_000
 * @param { [ [number,number] ] } range max length - 10_000
 *
 * @return { number } max value among all ranges sum
 */

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
