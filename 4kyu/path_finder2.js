/**
 * Path Finder #2: shortest path {@link https://www.codewars.com/kata/57658bfa28ed87ecfa00058a}
 * ```
 * pathFinder(
 * `.W.
 * .W.
 * ...`); // return 4
 * ```
 *
 * @param { String } maze
 * @return { Boolean } min number of steps to exit position [N-1, N-1]
 */
const pathFinder = (maze) => {
  const mazeArr = maze.split('\n').map((line) => line.split(''));
  const xMax = mazeArr.length - 1;
  const yMax = mazeArr[0].length - 1;
  const isCellExist = (nextX, nextY) => nextX >= 0 && nextX <= xMax && nextY >= 0 && nextY <= yMax;

  const cellsAroundCoordsDelta = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];
  const cellsAroundCount = cellsAroundCoordsDelta.length;
  const FREE_CELL_VALUE = '.';

  const [startX, startY] = [0, 0];
  const startCell = { x: startX, y: startY, count: 0 };
  const queueNextCells = [startCell];
  const visitedCells = new Set();

  while (queueNextCells.length) {
    const { x, y, count } = queueNextCells.shift();
    const visitedIndex = x * (xMax + 1) + y;

    if (visitedCells.has(visitedIndex)) {
      continue;
    }
    visitedCells.add(visitedIndex);

    mazeArr[x][y] = count;

    if (x === xMax && y === yMax) {
      return count;
    }

    for (let index = 0; index < cellsAroundCount; index++) {
      const nextX = x + cellsAroundCoordsDelta[index].x;
      const nextY = y + cellsAroundCoordsDelta[index].y;

      if (isCellExist(nextX, nextY)) {
        const nextCell = mazeArr[nextX][nextY];

        if (nextCell === FREE_CELL_VALUE) {
          queueNextCells.push({ x: nextX, y: nextY, count: count + 1 });
        }
      }
    }
  }

  return false;
};

export default pathFinder;
