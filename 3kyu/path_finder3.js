/**
 * Path Finder #3: the Alpinist {@link https://www.codewars.com/kata/576986639772456f6f00030c}
 * ```
 * pathFinder(
 * `010
 * 010
 * 010`); // return 2
 * ```
 *
 * @param { String } area
 * @return { number } min number of climb rounds to target location [N-1, N-1]
 */
const pathFinder = (area) => {
  const areaArr = area.split('\n').map((line) => line.split(''));
  const xMax = areaArr.length - 1;
  const yMax = areaArr[0].length - 1;
  const isCellExist = ({ x, y }) => x >= 0 && x <= xMax && y >= 0 && y <= yMax;
  const getCellsAround = (x, y) => [
    { x: x + 1, y },
    { x: x - 1, y },
    { x, y: y + 1 },
    { x, y: y - 1 },
  ];
  const weights = Array.from({ length: xMax + 1 }).map(() => Array(yMax + 1).fill(Infinity));

  const START_CELL = { x: 0, y: 0 };
  const FINISH_CELL = { x: xMax, y: yMax };

  weights[START_CELL.x][START_CELL.y] = 0;
  const queueNextCells = [START_CELL];

  while (queueNextCells.length) {
    const { x, y } = queueNextCells.shift();

    for (const { x: nextX, y: nextY } of getCellsAround(x, y).filter(isCellExist)) {
      const moveWeight = Math.abs(areaArr[nextX][nextY] - areaArr[x][y]);

      const cellPathWeight = weights[nextX][nextY];
      const prevCellPathWeight = weights[x][y];

      if (cellPathWeight > prevCellPathWeight + moveWeight) {
        weights[nextX][nextY] = prevCellPathWeight + moveWeight;

        queueNextCells.push({ x: nextX, y: nextY });
      }
    }
  }

  return weights[FINISH_CELL.x][FINISH_CELL.y];
};

export default pathFinder;
