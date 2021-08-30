/* eslint-disable no-param-reassign */
/**
 * "Sum of Intervals" {@link https://www.codewars.com/kata/52b7ed099cdc285c300001cd}
 *
 * @param { Array< [ number ] >} intervals
 * @return { number } sum
 */
// eslint-disable-next-line no-unused-vars
const sumIntervalsOld = (intervals) => {
  intervals = intervals.sort(([a, A], [b, B]) => a - b || A - B);

  let sum = 0;

  for (let i = 0; i < intervals.length; i++) {
    const [startA, finishA] = intervals[i];

    const diff = finishA - startA;
    if (diff === 0) {
      continue;
    }
    sum += diff;

    for (let j = i + 1; j < intervals.length; j++) {
      const [startB, finishB] = intervals[j];

      if (startB === startA && finishB === finishA) {
        intervals[j][0] = 0;
        intervals[j][1] = 0;
      } else if (finishA > startB) {
        if (finishA >= finishB) {
          if (startA >= startB) {
            if (startA <= finishB) {
              intervals[j][1] = startA;
            }
          } else {
            intervals[j][0] = 0;
            intervals[j][1] = 0;
          }
        } else if (finishB > finishA) {
          intervals[j][0] = finishA;
        }
      }
    }
  }

  return sum;
};

const sumIntervals = (intervals) => {
  let sum = 0;
  let max = -Infinity;
  intervals = intervals.sort(([a, A], [b, B]) => a - b || A - B);

  for (const [start, finish] of intervals) {
    if (start > max) {
      max = start;
    }
    if (finish > max) {
      sum += finish - max;
      max = finish;
    }
  }

  return sum;
};

export default sumIntervals;
