const mapSymbolToAngleFn = {
  r: (radAngle) => radAngle + Math.PI / 2,
  l: (radAngle) => radAngle - Math.PI / 2,
  R: (radAngle) => radAngle + Math.PI,
  L: (radAngle) => radAngle - Math.PI,
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
  const commands = path.match(/\d+|./g) || [];
  let { x = 0, y = 0, radAngle = 0 } = IamHere.lastPosition || {};

  for (const command of commands) {
    const step = Number(command);

    if (!Number.isInteger(step)) {
      radAngle = mapSymbolToAngleFn[command](radAngle);
    } else {
      x -= Math.round(Math.cos(radAngle)) * step;
      y += Math.round(Math.sin(radAngle)) * step;
    }
  }
  IamHere.lastPosition = { x, y, radAngle };
  return [x, y];
}
export default IamHere;
