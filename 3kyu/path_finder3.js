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
  const isCellExist = (nextX, nextY) => nextX >= 0 && nextX <= xMax && nextY >= 0 && nextY <= yMax;

  const cellsAroundCoordsDelta = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];
  const cellsAroundCount = cellsAroundCoordsDelta.length;

  const [startX, startY] = [0, 0];
  const startCell = { x: startX, y: startY, count: 0 };

  const weights = new Array(areaArr.length).fill(0).map(() => []);
  weights[startX][startY] = 0;
  const queueNextCells = [startCell];

  while (queueNextCells.length) {
    const { x, y } = queueNextCells.shift();

    for (let index = 0; index < cellsAroundCount; index++) {
      const nextX = x + cellsAroundCoordsDelta[index].x;
      const nextY = y + cellsAroundCoordsDelta[index].y;

      if (!isCellExist(nextX, nextY)) {
        continue;
      }

      const currentValue = areaArr[nextX][nextY];
      if (currentValue === undefined) {
        continue;
      }
      const prevValue = areaArr[x][y];
      const moveWeight = Math.abs(currentValue - prevValue);

      const currentCellWeightSum = weights[nextX][nextY];
      const prevCellWeightSum = weights[x][y];

      if (
        currentCellWeightSum === undefined ||
        currentCellWeightSum > prevCellWeightSum + moveWeight
      ) {
        weights[nextX][nextY] = prevCellWeightSum + moveWeight;

        queueNextCells.push({ x: nextX, y: nextY });
      }
    }
  }

  return weights[xMax][yMax];
};

export default pathFinder;
