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
  const xMax = mazeArr.length;
  const yMax = mazeArr[0].length;

  const FREE_CELL_VALUE = '.';

  const cellsAroundCoordsDelta = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];
  const cellsAroundCount = cellsAroundCoordsDelta.length;

  const isCellExist = (nextX, nextY) => nextX >= 0 && nextX < xMax && nextY >= 0 && nextY < yMax;

  const [startX, startY] = [0, 0];
  const startCell = { x: startX, y: startY, count: 0 };
  const queueNextCells = [startCell];

  while (queueNextCells.length) {
    const { x, y, count } = queueNextCells.pop();
    mazeArr[x][y] = count;

    for (let index = 0; index < cellsAroundCount; index++) {
      const nextX = x + cellsAroundCoordsDelta[index].x;
      const nextY = y + cellsAroundCoordsDelta[index].y;

      if (isCellExist(nextX, nextY)) {
        const nextCell = mazeArr[nextX][nextY];

        if (nextCell === FREE_CELL_VALUE || nextCell > count + 1) {
          queueNextCells.push({ x: nextX, y: nextY, count: count + 1 });
        }
      }
    }
  }

  const last = mazeArr[xMax - 1][yMax - 1];

  return Number.isInteger(last) ? last : false;
};

export default pathFinder;
