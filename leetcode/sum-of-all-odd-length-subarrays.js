/**
 * "1588. Sum of All Odd Length Subarrays" {@link "https://leetcode.com/problems/sum-of-all-odd-length-subarrays/}
 * @param { number[] } arr
 * @return { number } sum
 */
const sumOddLengthSubarrays = (arr) => {
  // Просто перебором, сложность временная O( (n/2)^3 )
  let sum = 0;

  for (let odd = 1; odd <= arr.length; odd += 2) {
    for (let i = 0; i < arr.length + 1 - odd; i++) {
      sum += arr.slice(i, i + odd).reduce((acc, n) => acc + n, 0);
    }
  }

  return sum;
};

export default sumOddLengthSubarrays;

// по формуле, сложность временная O(n)

// const sumOddLengthSubarrays = (arr) => {
//   let sum = 0;
//   const arrLength = arr.length;

//   for (let index = 0; index < arrLength; index++) {
//     sum += Math.floor(((index + 1) * (arrLength - index) + 1) / 2) * arr[index];
//   }

//   return sum;
// };
