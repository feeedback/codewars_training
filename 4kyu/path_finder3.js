const getAngle = (angle) => (360 + angle) % 360;

const mapSymbolToAngleFn = {
  r: (angle) => getAngle(angle + 90),
  l: (angle) => getAngle(angle - 90),
  R: (angle) => getAngle(angle + 180),
  L: (angle) => getAngle(angle - 180),
};
const symbolsDirection = new Set(Object.keys(mapSymbolToAngleFn));

const mapAngleToGetCoordsFn = {
  0: (x, y, step) => [x + step * -1, y],
  90: (x, y, step) => [x, y + step],
  180: (x, y, step) => [x + step, y],
  270: (x, y, step) => [x, y + step * -1],
};

/**
 * "Path Finder #4: where are you?" {@link https://www.codewars.com/kata/5a0573c446d8435b8e00009f}
 * ```
 * pathFinder('r5L2l4'); // return [4,3]
 * ```
 *
 * @param { String } path
 * @return { [number, number ] } x, y coords
 */
function IamHere(path) {
  let { x = 0, y = 0, angle = 0 } = IamHere.lastPosition || {};
  const commands = path.match(/[A-z]|\d+/g) || [];

  for (const command of commands) {
    if (symbolsDirection.has(command)) {
      angle = mapSymbolToAngleFn[command](angle);
    } else {
      [x, y] = mapAngleToGetCoordsFn[angle](x, y, Number(command));
    }
  }
  IamHere.lastPosition = { x, y, angle }; // uncomment this line for serial test in codewars
  return [x, y];
}
export default IamHere;
