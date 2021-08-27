/**
 * Path Finder #3: the Alpinist {@link https://www.codewars.com/kata/576986639772456f6f00030c}
 * ```
 * pathFinder(
 * `.W.
 * .W.
 * ...`); // return true
 * ```
 *
 * @param { String } area
 * @return { Boolean } is can you reach the last element?
 */
const pathFinder = (area) => {
  const areaArr = area.split('\n').map((line) => line.split(''));
  const xMax = areaArr.length - 1;
  const yMax = areaArr[0].length - 1;
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

    areaArr[x][y] = count;

    if (x === xMax && y === yMax) {
      return count;
    }

    for (let index = 0; index < cellsAroundCount; index++) {
      const nextX = x + cellsAroundCoordsDelta[index].x;
      const nextY = y + cellsAroundCoordsDelta[index].y;

      if (isCellExist(nextX, nextY)) {
        const nextCell = areaArr[nextX][nextY];

        if (nextCell === FREE_CELL_VALUE) {
          queueNextCells.push({ x: nextX, y: nextY, count: count + 1 });
        }
      }
    }
  }

  return false;
};

export default pathFinder;
