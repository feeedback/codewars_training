/**
 * Bouncing Balls {@link https://www.codewars.com/kata/5544c7a5cb454edb3c000047}
 *
 * @param { number } dropHeight > 0
 * @param { number } bounceK > 0, < 1
 * @param { number } windowHeight < dropHeight
 *
 * @return { number } max value among all ranges sum
 */
const bouncingBall = (dropHeight, bounceK, windowHeight) => {
  const conditions = [dropHeight > 0, bounceK > 0, bounceK < 1, windowHeight < dropHeight];

  if (!conditions.every(Boolean)) {
    return -1;
  }

  let count = 1;
  let currentHeight = dropHeight;

  do {
    currentHeight *= bounceK;
    if (currentHeight > windowHeight) {
      count += 2;
    }
  } while (currentHeight > windowHeight);

  return count;
};

export default bouncingBall;
