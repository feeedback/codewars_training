/**
 * Path Finder #1: can you reach the exit? {@link https://www.codewars.com/kata/5765870e190b1472ec0022a2}

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

  const isCellPossibleToStep = (x, y) => (mazeArr[x] || [])[y] === '.';
  const isFinish = (x, y) => x === mazeArr.length - 1 && y === mazeArr[x].length - 1;

  const getCellsAround = (x, y) => [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
  const getPossibleStep = (x, y) =>
    getCellsAround(x, y).filter(([nextX, nextY]) => isCellPossibleToStep(nextX, nextY));

  const [startX, startY] = [0, 0];
  const queueForStep = [[startX, startY]];

  while (queueForStep.length) {
    const [x, y] = queueForStep.pop();

    for (const [nextX, nextY] of getPossibleStep(x, y)) {
      if (isFinish(nextX, nextY)) {
        return true;
      }

      queueForStep.push([nextX, nextY]);
    }

    mazeArr[x][y] = '▨';
  }

  return false;
};

export default pathFinder;
