/**
 * Path Finder #2: shortest path {@link https://www.codewars.com/kata/57658bfa28ed87ecfa00058a}
 * ```
 * pathFinder(
 * `.W.
 * .W.
 * ...`); // return true
 * ```
 *
 * @param { String } maze
 * @return { Boolean } is can you reach the last element?
 */
const pathFinder = (maze) => {
  const mazeArr = maze.split('\n').map((line) => line.split(''));

  const isCellPossibleToStep = (cell) => cell === '.';
  // const isFinish = (x, y) => x === mazeArr.length - 1 && y === mazeArr[x].length - 1;

  const getCellsAround = (x, y) => [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
  // const getPossibleStep = (x, y) =>
  //   getCellsAround(x, y).filter(([nextX, nextY]) => isCellPossibleToStep(nextX, nextY));

  const [startX, startY] = [0, 0];
  const queueForStep = [[startX, startY, 0]];

  while (queueForStep.length) {
    const [x, y, count] = queueForStep.pop();
    mazeArr[x][y] = count;

    for (const [nextX, nextY] of getCellsAround(x, y)) {
      const nextCell = (mazeArr[nextX] || [])[nextY];

      if (isCellPossibleToStep(nextCell) || (Number.isInteger(nextCell) && nextCell > count + 1)) {
        queueForStep.push([nextX, nextY, count + 1]);
      }
    }
  }
  const last = mazeArr[mazeArr.length - 1][mazeArr.length - 1];
  return Number.isInteger(last) ? last : false;
};

export default pathFinder;
