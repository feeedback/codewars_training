/**
 * The maximum sum value of ranges -- Simple version {@link https://www.codewars.com/kata/583d10c03f02f41462000137}
 *
 * @param { [number] } arr max length - 100
 * @param { [ [number,number] ] } range max length - 10
 *
 * @return { number } max value among all ranges sum
 */
const maxSum = (arr, range) => {
  let max = -Infinity;

  for (let index = 0; index < range.length; index++) {
    const [startIndex, finishIndex] = range[index];
    let sum = 0;
    for (let i = startIndex; i <= finishIndex; i++) {
      sum += arr[i];
    }
    if (sum > max) {
      max = sum;
    }
  }
  return max;
};
export default maxSum;
