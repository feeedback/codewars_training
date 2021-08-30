/**
 * "Sum of Intervals" {@link https://www.codewars.com/kata/52b7ed099cdc285c300001cd}
 *
 * @param { Array< [ number ] >} intervals
 * @return { number } sum
 */
const sumIntervals = (intervals) => {
  // const result = intervals.reduce(
  //   (sumInterval, interval) => sumInterval + interval.reduce((sum, num) => sum + num, 0),
  //   0
  // );
  // const result = intervals.reduce((sumInterval, [a, b]) => sumInterval + b - a, 0);
  // const flatIntervals = [];
  // const starts = [];
  // const finishs = [];
  // for (const [startA, finishA] of intervals) {
  //   for (const [startB, finishB] of intervals) {
  //     flatIntervals.push([start]);
  //   }
  // }
  let sum = 0;
  for (let i = 0; i < intervals.length; i++) {
    const [startA, finishA] = intervals[i];
    sum += finishA - startA;

    console.log({ i, sum });
    for (let j = i + 1; j < intervals.length; j++) {
      const [startB, finishB] = intervals[j];

      if (startB === startA && finishB === finishA) {
        sum -= finishB - startB;
      } else if (finishA > startB) {
        //
        if (finishA >= finishB) {
          console.log({ i, j, sum });
          if (startA >= startB) {
            if (startA <= finishB) {
              sum -= finishB - startA;
            }
          } else {
            sum -= finishB - startB;
          }
        } else if (finishB > finishA) {
          const diff = finishA - startB;
          sum -= diff;
        }
      }
      console.log({ i, j, sum });
    }
  }
  return sum;
};

// const test = sumIntervals([
//   [4, 7],
//   [1, 5],
// ]); // 6

export default sumIntervals;
